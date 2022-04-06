import React, { FC } from "react";
import Head from "next/head";
import { Navbar } from "./../../components/Navbar";

interface Props {
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const MainLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="autor" content="Alfredo Vazquez" />
        <meta name="description" content="Info de pokemon XXX" />
        <meta name="keywords" content="XXXX, pokemon, pokedex, app" />

        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta
          property="og:description"
          content={`Esta es la pagina sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      {/* Navbar */}
      <Navbar />

      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
