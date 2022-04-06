import { Pokemon } from "./../../interfaces/PokemonResponse";
import pokeApiAxios from "./../../api/PokeApi";

export const giveDataPokemon = async (valor: string) => {
  const { data } = await pokeApiAxios.get<Pokemon>(`/pokemon/${valor}`);

  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  };
};
