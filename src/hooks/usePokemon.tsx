import {useState, useEffect} from "react";
import type {Pokemon} from "../types/types";
import {fetchPokemon} from "../service/api";

export default function usePokemon(name:string){
    const [pokemon,setPokemon] = useState<Pokemon|null>(null);
    const [isLoading, setItsLoading] = useState<boolean>(false);
    const [error,setError] = useState<string|null>(null);

    useEffect(() => {
        const getPokemon = async() => {
            try{
                setItsLoading(true);
                setError(null);
                const data = await fetchPokemon(name);
                setPokemon(data);
             }catch(error){
                setError((error as Error).message);
             }finally{
                setItsLoading(false);
             }
        }
        getPokemon();
    },[name])
    return {pokemon,isLoading,error};
}