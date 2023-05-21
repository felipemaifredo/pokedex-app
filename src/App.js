import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getImg = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
  }

  const GetPokeURL = (id) => {
    return `https://pokeapi.co/api/v2/pokemon/${id}`;
  }

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonPromises = [];
      for (let i = 1; i <= 251; i++) {
        pokemonPromises.push(fetch( GetPokeURL(i) ).then(response => response.json()));
      }
      const pokemonData = await Promise.all(pokemonPromises);
      setPokemons(pokemonData);
    };

    fetchPokemon();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredPokemons = pokemons.filter(
    pokemon => pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className='container'>
      <nav>
        <img src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' alt='Logo Poke Api' />
        <input type="text" value={searchValue} onChange={handleSearchChange} placeholder="🔍 Search Pokemon" />
      </nav>
      <ul className='pokedex'>
        {filteredPokemons.map(pokemon => (
          <li key={pokemon.id} className={`card ${pokemon.types[0].type.name}`}>
            <img className="card-image" alt={pokemon.name} src={ getImg(pokemon.id) }/>
            <h2 className="card-title"> 
              {`${pokemon.id}. ${pokemon.name}`}
            </h2>
            <p className="card-subtitle">
              {pokemon.types.map(typeInfo => typeInfo.type.name).join(' | ')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
