import { Card, Grid, Text, Divider, Row } from "@nextui-org/react";
import React, { FC } from "react";
import { SmallPokemon } from "../../interfaces/PokemonListResponse";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";

/**
 * Definimos el tipo de props que recibira la card
 */
type PropsCardList = {
  pokemons: SmallPokemon[];
};

/**
 * Definimos el tipo de props que recibira la cardItem
 */
type PropsCardItem = {
  pokemon: SmallPokemon;
};

export const CardList: FC<PropsCardList> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} justify="flex-start">
      {pokemons.map((pokemon) => (
        <CardPokemonItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </Grid.Container>
  );
};

const CardPokemonItem: FC<PropsCardItem> = ({ pokemon }) => {
  const { name, id, url, img } = pokemon;

  const ruoter = useRouter();

  const onClik = () => {
    ruoter.push(`/pokemon/${pokemon.id}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
      <Card hoverable clickable onClick={onClik}>
        <Card.Header>
          <Text b>{name.toLocaleUpperCase()}</Text>
        </Card.Header>
        <Divider />
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={img} width="100%" height={140} />
        </Card.Body>
        <Divider />
        <Card.Footer>
          <Row justify="space-between">
            <Text>N. de Pokemon</Text>
            <Text>{id.toString().toLocaleUpperCase()}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
