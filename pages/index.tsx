import type { NextPage } from "next";
import { MainLayout } from "./../layout/MainLayout";
import { CardList } from "../components/Card";

import { GetStaticProps } from "next";
import {
  PokemonListResponse,
  SmallPokemon,
} from "../interfaces/PokemonListResponse";
import { Text } from "@nextui-org/react";

import PokeApi from "./../api/PokeApi";

type Props = {
  pokemons: SmallPokemon[];
};

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <MainLayout title="Listado de pokemons">
      <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $blue500 -20%, $pink500 50%",
        }}
        weight="bold"
      >
        Pokemones Región Kanto
      </Text>

      <CardList pokemons={pokemons} />
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await PokeApi.get<PokemonListResponse>("/pokemon?limit=151"); // your fetch function here

  let pokemonsArray: SmallPokemon[];

  pokemonsArray = data.results.map((item, idx) => {
    return {
      id: idx + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        idx + 1
      }.svg`,
      name: item.name,
      url: item.url,
    };
  });

  return {
    props: {
      pokemons: pokemonsArray,
    },
  };
};

export default Home;
