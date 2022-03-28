import React from "react";
import { useRouter } from "next/router";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { MainLayout } from "../../layout/MainLayout";
import { Pokemon } from "../../interfaces/PokemonResponse";

import pokeApi from "../../api/PokeApi";

interface Props {
  pokemon: any;
}

const Pokemon: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter();

  return (
    <MainLayout title={pokemon.name}>
      <h1>{pokemon.name.toLocaleUpperCase()}</h1>

      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              <Button color="gradient" ghost>
                Guardar a favoritos
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites</Text>

              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  //const { data } = await  // your fetch function here

  const pokemons151 = [...Array(151)].map((value, idx) => `${idx + 1}`);

  return {
    // paths: [
    //   {
    //     params: {
    //       id: '1'
    //     }
    //   }
    // ],
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  console.log(data);
  return {
    props: {
      pokemon: data,
    },
  };
};

export default Pokemon;
