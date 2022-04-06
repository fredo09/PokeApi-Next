/**
*   storage functions 
**/

import { NAME_STORAGE } from "../contans";

/**
 * Checa si hay pokemones favoritos en localStorage
 * @param id 
 */
export const toogleFavorite = (id: number) => {
    console.log('toggleFAVORITE');

    let favorites: number[] = JSON.parse(getPokemon() || '[]'); 
    let favoritesTransforms: string;

    if (favorites.includes(id)) {
        favorites = favorites.filter( pokeId => pokeId !== id);
    } else {
        favorites.push(id);
    }

   favoritesTransforms = JSON.stringify(favorites);
    setPokemon(favoritesTransforms);
}

/**
 * Regresa un arreglo de numeros
 * @returns number[]
 */
export const pokemons = (): number[] => {
    return JSON.parse(getPokemon() || '[]');
}

/**
 * Verifica si existe el pokemon en localStorage
 * @param id 
 * @returns boolean
 */
export const existFavoritePokemon = (id: number): boolean => {
    const favorites: number[] = JSON.parse(getPokemon() || '[]'); 
    
    return favorites.includes(id);
}

/**
 * Obtenemos la información del pokemon en el localStorage
 * @returns 
 */
const getPokemon = () => {

    if ( typeof window === 'undefined') return false;

    return localStorage.getItem(NAME_STORAGE);
}


/**
 * Asigna informacion al localStorege
 * @param favoritiesPokemon
 */
const setPokemon = (favoritiesPokemon : string) => {
    localStorage.setItem(NAME_STORAGE, favoritiesPokemon);
}