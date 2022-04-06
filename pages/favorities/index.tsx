import React, { FC, useEffect, useState } from "react";
import { MainLayout } from "./../../layout/MainLayout";
import { NoFavorites } from "../../components/NoFavorites";
import { pokemons } from "./../../utils/storage";
import { Card, Grid } from "@nextui-org/react";
import { Favorites } from "../../components/Favorites";

const Favorities: FC = () => {
  const [favoritesPokemons, setFavoritesPokemon] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemon(pokemons);
  }, []);

  return (
    <MainLayout title="Favorities Pokemons">
      {favoritesPokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <Favorites pokemons={favoritesPokemons} />
      )}
    </MainLayout>
  );
};

export default Favorities;
