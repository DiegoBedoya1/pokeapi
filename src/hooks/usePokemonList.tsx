import {useState, useEffect} from "react";
import type {Pokemon} from "../types/types";
import {fetchAll} from "../service/api";

export default function usePokemonList(){
    const [pokemonList,setPokemonList] = useState<Pokemon[]>([]);
    const[isLoading,setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState<string|null>(null);

    useEffect(() => {
        const getLista = async () => {
            try{
                setIsLoading(true);
                setError(null);
                const data = await fetchAll();
                setPokemonList(data);
            }catch(error){
                setError((error as Error).message);
            }finally{
                setIsLoading(false);
            }
        }
        getLista();
    },[]);
    return {pokemonList,isLoading, error};
}