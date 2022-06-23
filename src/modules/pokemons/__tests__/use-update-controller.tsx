import { mockEditPokemon } from "@App/mocks/mock-pokemons";
import { mockServer } from "@App/mocks/server";
import { renderHook } from "@testing-library/react-hooks";
import { useUpdatePokemonMutation } from "../controllers";
import { WrapperPokemon } from "../utils";

describe("testing edit controller", () => {
  test("The controller can make the call and give appropiate flags", async () => {
    const resolveValue = {
      id: 10,
      name: "Pokemon test",
      image: "https://urpgstatic.com/images/pokemon-home.png",
      attack: 10,
      defense: 10,
      hp: 10,
      type: "Fuego",
      id_author: 1,
    };

    mockServer.use(
      mockEditPokemon({
        delay: 100,
        resolve: resolveValue,
      })
    );

    const { result, waitFor } = renderHook(() => useUpdatePokemonMutation(), {
      wrapper: WrapperPokemon,
    });
    await waitFor(() => {
      return !!result.current.mutate;
    });
    result.current.mutate(resolveValue);

    await waitFor(() => {
      return result.current.isLoading;
    });
    await waitFor(() => {
      return result.current.isSuccess;
    });
    expect(result.current.status).toBe("success");
    expect(result.current.data).toEqual(resolveValue);
  });
});
