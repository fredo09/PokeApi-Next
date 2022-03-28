import React, { FC } from 'react'
import Head from 'next/head';
import { Navbar } from './../../components/Navbar';

interface Props {
    title?: string
} 

export const MainLayout: FC<Props> = ({children, title}) => {
  return (
      <>
          <Head>
              <title>{ title || 'Pokemon App' }</title>
              <meta name='autor' content='Alfredo Vazquez' />
              <meta name='description' content='Info de pokemon XXX' />
              <meta name='keywords' content='XXXX, pokemon, pokedex, app'/>
          </Head>
          
          {/* Navbar */}
            <Navbar/>
          
          <main style={{
              padding:'0px 20px',
          }}>
              {children}
          </main>
      </>
  )
}
