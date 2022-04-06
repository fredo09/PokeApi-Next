import { Grid, Card } from "@nextui-org/react";
import React, { FC } from "react";
import Router, { useRouter } from "next/router";

interface Props {
  pokemons: number[];
}

interface PropsCard {
  idPokemon: number;
}

export const Favorites: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((id) => (
        <FavoritesPokemonsCard idPokemon={id} key={id} />
      ))}
    </Grid.Container>
  );
};

const FavoritesPokemonsCard: FC<PropsCard> = ({ idPokemon }) => {
  const route = useRouter();

  const onClickFavorites = () => {
    route.push(`/pokemon/${idPokemon}`);
  };

  return (
    <Grid xs={6} md={2} sm={3} xl={1} onClick={onClickFavorites}>
      <Card
        hoverable
        clickable
        css={{
          padding: 10,
        }}
      >
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPokemon}.svg`}
          width={"100%"}
          height={140}
        />
      </Card>
    </Grid>
  );
};
