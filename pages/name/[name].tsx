import React, { FC, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { MainLayout } from "../../layout/MainLayout";
import { Pokemon } from "../../interfaces/PokemonResponse";
import { PokemonListResponse } from "../../interfaces/PokemonListResponse";
import { toogleFavorite, existFavoritePokemon } from "../../utils/storage";
import pokeApiAxios from "./../../api/PokeApi";
import { giveDataPokemon } from "./../../utils/dataPokemon";
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: FC<Props> = ({ pokemon }) => {
  console.log(pokemon);

  //State
  const [isFavorite, setFavorite] = useState(existFavoritePokemon(pokemon.id));

  //Parametros para lanza el confetti
  const duration: number = 15 * 1000;
  const animationEnd: number = Date.now() + duration;
  const defaults: any = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
  };

  const onToggleFavorite = () => {
    toogleFavorite(pokemon.id);
    setFavorite(!isFavorite);

    if (isFavorite) return;

    setConfetti();
  };

  //Lanzamiento del confetti
  const randomInRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  const setConfetti = () => {
    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  };

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

              <Button
                color="gradient"
                ghost={!isFavorite}
                onClick={onToggleFavorite}
              >
                {isFavorite ? "En Favoritos" : "Guardar a favoritos"}
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
  const { data } = await pokeApiAxios.get<PokemonListResponse>(
    `/pokemon?limit=151`
  );

  const pokemonsResults: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonsResults.map((pokemon) => ({
      params: { name: pokemon },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  const pokemon = await giveDataPokemon(name);

  console.log(pokemon);

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonByNamePage;
