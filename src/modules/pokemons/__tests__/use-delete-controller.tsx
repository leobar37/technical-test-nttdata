import { mockDeletePokemon } from "@App/mocks/mock-pokemons";
import { mockServer } from "@App/mocks/server";
import { renderHook } from "@testing-library/react-hooks";
import { useDeletePokemonMuatation } from "../controllers";
import { WrapperPokemon } from "../utils";

describe("testing delete  controller", () => {
  test("The controller can make the call and give appropiate flags ", async () => {
    const resolveValue = {
      success: true,
      type: "pokemon_removed",
      data: [],
    };

    mockServer.use(
      mockDeletePokemon({
        delay: 100,
        resolve: resolveValue,
        args: {
          id: 4,
        },
      })
    );

    const { result, waitFor } = renderHook(() => useDeletePokemonMuatation(), {
      wrapper: WrapperPokemon,
    });
    await waitFor(() => {
      return !!result.current.mutate;
    });
    result.current.mutate(4);

    await waitFor(() => {
      return result.current.isLoading;
    });
    await waitFor(() => {
      return result.current.isSuccess;
    });
    expect(result.current.status).toBe("success");
    expect(result.current.data).toBeTruthy();
  });
});
