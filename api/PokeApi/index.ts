import axios from "axios";
import { BASE_API_POKEMON } from './../../utils/contans';

const pokeApi = axios.create({
    baseURL: BASE_API_POKEMON
});

export default pokeApi;