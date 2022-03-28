import React, { FC } from "react";
import { Text } from "@nextui-org/react";
import { MainLayout } from "./../../layout/MainLayout";

const Favorities: FC = () => {
  return (
    <MainLayout title="Favorities Pokemons">
      <Text>Pokemons Favoritos</Text>
    </MainLayout>
  );
};

export default Favorities;
