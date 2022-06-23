import Axios from "axios";
import { URL_API_POKEMON } from "@App/constants";
const pokemonApi = Axios.create({
  baseURL: URL_API_POKEMON,
});

export default pokemonApi;
