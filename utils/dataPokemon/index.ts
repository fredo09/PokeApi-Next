import { Pokemon } from "./../../interfaces/PokemonResponse";
import pokeApiAxios from "./../../api/PokeApi";

/**
 * Revisamos si hay un pokemon existente en la info que regresa el api de pokemon
 * @param valor
 * @returns
 */
export const giveDataPokemon = async (valor: string) => {
  try {
    const { data } = await pokeApiAxios.get<Pokemon>(`/pokemon/${valor}`);

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };
  } catch (err) {
    return null;
  }
};
