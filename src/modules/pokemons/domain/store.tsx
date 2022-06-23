/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, FC, ReactNode, useContext } from "react";
import { Updater, useImmer } from "use-immer";
import { Pokemon } from "../domain/types";
const initialState = {
  modalPokemon: {
    isOpen: false,
    mode: "create" as "create" | "edit",
    pokemon: null as Pokemon | null,
  },
  query: "",
};

type State = typeof initialState;

const PokemonsContext = createContext<{
  state: State;
  patch: Updater<State>;
}>(undefined!);

type PokemonsProviderProps = {
  children: ReactNode;
};
export const PokemonsProvider: FC<PokemonsProviderProps> = ({ children }) => {
  const [state, patch] = useImmer(initialState);

  return (
    <PokemonsContext.Provider
      value={{
        patch,
        state,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};

export const usePokemonStore = () => useContext(PokemonsContext);

export const useMantainModal = () => {
  const { patch, state } = usePokemonStore();

  const openModal = (pokemon?: Pokemon) => {
    patch((state: State) => {
      if (pokemon) {
        state.modalPokemon.mode = "edit";
        state.modalPokemon.pokemon = pokemon;
      }
      state.modalPokemon.isOpen = true;
    });
  };

  const closeModal = () => {
    patch((state: State) => {
      state.modalPokemon = initialState.modalPokemon;
    });
  };

  return {
    ...state.modalPokemon,
    closeModal,
    openModal,
  };
};
