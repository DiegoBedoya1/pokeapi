import type {Pokemon} from "../types/types"
interface PokeCardProps {
    pokemon: Pokemon;
    onFavorite: () => void;
    isFavorite: boolean;
}
export default function PokeCard({pokemon,onFavorite,isFavorite}:PokeCardProps){
    return(
        <div style = {{
            border: "1px solid black",
            padding: "10px",
            width: "200px" 
        }
        }>
            <small>#{pokemon.id}</small>
            <h2 style = {{textTransform: "capitalize", margin: "5px 0"}}>
                {pokemon.name}
            </h2>
            <img src = {pokemon.sprites.front_default}
            alt = {pokemon.name}
            style = {{width: "100px", display: "block"}}/>
            <div>
                <strong> Tipo: </strong>
                {pokemon.types.map((t) => t.type.name).join(", ")
                }
            </div>
            <button
            onClick = {onFavorite}
            style = {{cursor: "pointer", backgroundColor: "blue"}}
            title = {isFavorite ? "No me gusta" : "Me gusta"}> 
            {isFavorite ? '❤️' : '🤍'}</button>
        </div>
    )
    
}