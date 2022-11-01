import "../css/global.css"
import "./poke-api.js"

function convertPokemonToHtml(pokemon) {
  return `
    <li class="pokemon">
      <span class="number">#001</span>
        <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              <li class="type">grass</li>
              <li class="type">poison</li>
            </ol>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
              alt="${pokemon.name}"
            />
        </div>
      </li>
  `
}

const pokemonOlList = document.getElementById("pokemon-list")

pokeApi.getPokemons().then((pokemons = []) => {
  pokemonOlList.innerHTML = pokemons.map(convertPokemonToHtml).join("")
  console.log(newList)
})
