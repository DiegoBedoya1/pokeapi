import './App.css';
import PokeCard from "./components/PokeCard";
import usePokemonList from "./hooks/usePokemonList";
import {useState} from "react";
import type {Pokemon} from "./types/types";
import SearchBar from "./components/SearchBar";


function App() {
 //const {pokemon,isLoading,error} = usePokemon("totodile");
 const {pokemonList,isLoading,error} = usePokemonList();
 const [pagina,setPagina] = useState<number>(1);
 const [favoritos,setFavoritos] = useState<Pokemon[]>([]);
 const [mostrarFavoritos, setMostrarFavoritos] = useState<boolean>(false);
 const [busqueda, setBusqueda] = useState<string>("");
 const handleBusqueda = (texto:string) => {
      setBusqueda(texto);
      setPagina(1);
 };
 const listaBase = mostrarFavoritos ? favoritos : pokemonList;
  const listaFiltrada = listaBase.filter(poke => 
    poke.name.toLowerCase().includes(busqueda.toLowerCase())
  );

 const togglePokemon = (pokemon:Pokemon) => {
  const existe = favoritos.find(fav => fav.id === pokemon.id);
  if(existe){
    setFavoritos(favoritos.filter((poke) => poke.id !== pokemon.id));
  }
  else{
    setFavoritos([...favoritos,pokemon]);
  }
 }
 const itemsPorPagina = 32;
  const ultimoIndex = pagina*itemsPorPagina;
  const primerIndex = ultimoIndex-itemsPorPagina;
 const pokemonActuales = listaFiltrada.slice(primerIndex,ultimoIndex);
 const totalPaginas = Math.ceil(listaFiltrada.length / itemsPorPagina);

 return (
    <>
      <div style={{ padding: '20px' }}>
        
        {/* TU HEADER (Intacto) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: '2px solid #eee', 
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          <h1 style={{ margin: 0 }}>Pokédex Kanto</h1>
          
          <button 
            onClick={() => setMostrarFavoritos(!mostrarFavoritos)}
            style={{ 
              padding: '10px 15px', 
              cursor: 'pointer', 
              backgroundColor: mostrarFavoritos ? '#ccc' : '#ffcb05', 
              border: '1px solid #333', 
              fontWeight: 'bold' 
            }}
          >
            {mostrarFavoritos ? '🔙 Volver al Catálogo' : `⭐ Mis Favoritos (${favoritos.length})`}
          </button>
        </div>
        <SearchBar text = {busqueda} onSearch = {handleBusqueda}/>

        <h2>Buscador Pokedex</h2>
        {isLoading && <p>Conectando a la pokeApi</p>}
        {error && <p style={{ color: "red" }}> Ups: {error} </p>}

        {/* AQUÍ ESTÁ LA MAGIA: EL RENDERIZADO CONDICIONAL */}
        {mostrarFavoritos ? (
          
          // ==========================================
          // PANTALLA 1: SI mostrarFavoritos ES TRUE
          // ==========================================
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", minHeight: "500px" }}>
            {favoritos.length === 0 ? (
              <p>No tienes favoritos guardados.</p>
            ) : (
              pokemonActuales.map((poke) => (
                <PokeCard 
                  key={poke.id} 
                  pokemon={poke}
                  onFavorite={() => togglePokemon(poke)}
                  isFavorite={true}
                />
              ))
            )}
          </div>

        ) : (

          // ==========================================
          // PANTALLA 2: SI mostrarFavoritos ES FALSE (Tu código original)
          // ==========================================
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", minHeight: "500px" }}>
              {pokemonActuales.map((poke) => (
                <PokeCard 
                  key={poke.id} 
                  pokemon={poke}
                  // Le pasamos las props a TU componente
                  onFavorite={() => togglePokemon(poke)}
                  isFavorite={favoritos.some(fav => fav.id === poke.id)}
                />
              ))}
            </div>

            {/* Tu paginación exacta */}
            {!isLoading && !error && (
              <div style={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px"
              }}> 
                <button 
                  onClick={() => setPagina(pagina - 1)}
                  disabled={pagina === 1} 
                  style={btnStyle}
                > 
                  Anterior
                </button>
                <span style={{ fontWeight: "bold" }}>{pagina}/{totalPaginas} </span>
                <button 
                  onClick={() => setPagina(pagina + 1)}
                  disabled={pagina === totalPaginas} 
                  style={btnStyle}
                > 
                  Siguiente
                </button>
              </div>
            )}
          </>

        )} 
        {/* FIN DEL RENDERIZADO CONDICIONAL */}

      </div>
    </>
  );
}


const btnStyle = {
  padding: '8px 16px',
  borderRadius: '20px',
  border: '2px solid #2a75bb',
  backgroundColor: '#fff',
  color: '#2a75bb',
  fontWeight: 'bold',
  cursor: 'pointer'
};
export default App
