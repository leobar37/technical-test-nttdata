import { FC, ReactNode } from "react";
import { WrapperApp } from "@App/test-utils";
import { PokemonsProvider } from "./domain/store";
type WrapperPokemonProps = {
  children: ReactNode;
};
export const WrapperPokemon: FC<WrapperPokemonProps> = ({ children }) => {
  return (
    <WrapperApp>
      <PokemonsProvider>{children}</PokemonsProvider>
    </WrapperApp>
  );
};
