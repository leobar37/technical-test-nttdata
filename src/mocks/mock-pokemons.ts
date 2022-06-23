import { rest } from "msw";
import { URL_API_POKEMON } from "../constants";
import { faker } from "@faker-js/faker";
import { Pokemon } from "@App/modules/pokemons/domain/types";
import { sleep } from "@App/utils";
import { SafeAny } from "@App/types";
type Options = {
  delay: number;
  results: number;
};

let cont = 0;

const createPokemon = () => {
  return {
    id: ++cont,
    defense: Number(faker.random.numeric(5)),
    attack: Number(faker.random.numeric(5)),
    hp: Number(faker.random.numeric(5)),
    id_author: 1,
    image: faker.image.animals(250, 250),
    name: faker.random.word(),
    type: "Fuego",
  } as Pokemon;
};

export const mockLisPokemons = (options: Options) => {
  return rest.get(URL_API_POKEMON, async (req, res, ctx) => {
    const pokemons = Array.from({ length: options.results }).map((_) =>
      createPokemon()
    );
    await sleep(options.delay);
    return res(ctx.status(200), ctx.json(pokemons));
  });
};

type CreateOptions = {
  delay: number;
  resolve: SafeAny;
};
export const mockCreatePokemon = (options: CreateOptions) => {
  return rest.post(URL_API_POKEMON, async (req, rest, ctx) => {
    await sleep(options.delay);

    return rest(ctx.status(200), ctx.json(options.resolve));
  });
};

export const mockEditPokemon = (options: CreateOptions) => {
  return rest.put(
    URL_API_POKEMON + `/${options.resolve.id}`,
    async (req, rest, ctx) => {
      await sleep(options.delay);
      return rest(ctx.status(200), ctx.json(options.resolve));
    }
  );
};

type DeleteOptions = {
  args: {
    id: number;
  };
} & CreateOptions;
export const mockDeletePokemon = (options: DeleteOptions) => {
  return rest.delete(
    URL_API_POKEMON + `/${options.args.id}`,
    async (req, rest, ctx) => {
      await sleep(options.delay);
      return rest(ctx.status(200), ctx.json(options.resolve));
    }
  );
};
