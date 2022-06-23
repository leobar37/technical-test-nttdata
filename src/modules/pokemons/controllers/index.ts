import pokemonApi from "@App/libs/pokemonApi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Pokemon } from "../domain/types";
import { CreatePokemon } from "../domain/types";
import { omit } from "lodash";
import { usePokemonStore } from "../domain/store";
import { useMemo } from "react";

export const usePokemonData = () => {
  const { state } = usePokemonStore();
  const result = useQuery<Pokemon[]>(["listPokemons"], async () => {
    const params = new URLSearchParams();
    params.append("idAuthor", "1");
    return pokemonApi
      .get("", {
        params: params,
      })
      .then((d) => d.data);
  });
  const dataWithSearch = useMemo(() => {
    const data = result.data || [];
    if (state.query.length == 0) {
      return data;
    }
    return data.filter(
      (d) =>
        d.name.toLocaleLowerCase().indexOf(state.query.toLocaleLowerCase()) !==
        -1
    );
  }, [state.query, result]);
  return {
    ...result,
    data: dataWithSearch,
  };
};

export const useCreatePokemonMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(async (pokemon: CreatePokemon) => {
    const params = new URLSearchParams();
    // TODO:
    /**
     * These values are required by the api to create pokemon
     */
    const defaultValues = {
      hp: 10,
      type: "Fuego",
      idAuthor: 1,
    };
    const result = await pokemonApi.post(
      "",
      { ...pokemon, ...defaultValues },
      {
        params,
      }
    );

    queryClient.invalidateQueries(["listPokemons"]);
    return result.data;
  });
};

export const useUpdatePokemonMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(async (pokemon: Pokemon) => {
    const result = await pokemonApi.put(`/${pokemon.id}`, {
      ...omit(pokemon, "id_author"),
      idAuthor: pokemon.id_author,
    });
    queryClient.invalidateQueries(["listPokemons"]);
    return result.data;
  });
};

export const useDeletePokemonMuatation = () => {
  const queryClient = useQueryClient();
  return useMutation(async (id: number) => {
    const result = await pokemonApi.delete(`/${id}`);
    queryClient.invalidateQueries(["listPokemons"]);
    return result.data.success;
  });
};
