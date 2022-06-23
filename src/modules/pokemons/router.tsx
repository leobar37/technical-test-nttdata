import { Route } from "react-router-dom";
import PokemonView from "./views/PokemonView";

export const router = <Route path="/" element={<PokemonView />}></Route>;
