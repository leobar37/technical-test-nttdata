import { renderHook } from "@testing-library/react-hooks";
import { usePokemonData } from "../controllers";
import { WrapperPokemon } from "../utils";
import { mockLisPokemons } from "@App/mocks/mock-pokemons";
import { mockServer } from "@App/mocks/server";
import PokemonsTable from "../components/PokemonsTable";
import { render, waitFor } from "@testing-library/react";
import { act } from "@App/test-utils";
import { SafeAny } from "@App/types";
import { ReactElement } from "react";

const TestComponent = () => {
  const { data, isLoading } = usePokemonData();
  return <PokemonsTable data={data ?? []} isLoading={isLoading} />;
};
const stub = (node: ReactElement) => {
  return <WrapperPokemon>{node}</WrapperPokemon>;
};
describe("testing list pokemons", () => {
  test("The controller is working properly", async () => {
    mockServer.use(
      mockLisPokemons({
        delay: 100,
        results: 10,
      })
    );
    const { result, waitFor } = renderHook(() => usePokemonData(), {
      wrapper: WrapperPokemon,
    });
    await waitFor(() => {
      return result.current.isSuccess;
    });
    expect(Array.isArray(result.current.data)).toBeTruthy();
    expect(result.current.data.length).toBe(10);
  });

  test("The data is correctly displayed in the interface", async () => {
    mockServer.use(
      mockLisPokemons({
        delay: 100,
        results: 10,
      })
    );
    let container: HTMLElement = null as SafeAny as HTMLElement;

    await act(async () => {
      const { container: cont } = render(stub(<TestComponent />));
      container = cont;
    });
    await waitFor(() => {
      expect(container.querySelectorAll("table tbody tr").length).toBe(10);
    });
  });

  test("not found is displayed when the data is empty", async () => {
    mockServer.use(
      mockLisPokemons({
        delay: 100,
        results: 0,
      })
    );

    const { getByTestId } = render(stub(<TestComponent />));

    await waitFor(() =>
      expect(getByTestId("notFoundResults")).toBeInTheDocument()
    );
  });
});
