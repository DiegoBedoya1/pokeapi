import type {Pokemon} from "../types/types";

const url = 'https://pokeapi.co/api/v2';

export const fetchPokemon = async (name:string):Promise<Pokemon> => {
    const response = await fetch(`${url}/pokemon/${name.toLowerCase()}`);
    if(!response.ok){
        throw new Error("Error on fetching");
    }
    return response.json();
}

export const fetchAll = async(limit = 151):Promise<Pokemon[]> => {
    const response = await fetch(`${url}/pokemon?limit=${limit}`);
    if(!response.ok){
        throw new Error("Error on fetching data");
    }
    const data = await response.json();
    const promises = data.results.map((p:{name:string}) =>fetchPokemon(p.name));
    return Promise.all(promises);
}