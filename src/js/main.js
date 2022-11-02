import "../css/global.css"
import "./poke-api.js"

function convertPokemonTypesToLi(pokemonTypes) {
  return pokemonTypes.map(
    (typeSlot) => `<li class="type">${typeSlot.type.name}</li>`
  )
}

function convertPokemonToHtml(pokemon) {
  return `
    <li class="pokemon">
      <span class="number">#${pokemon.order}</span>
        <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${convertPokemonTypesToLi(pokemon.types).join("")}
            </ol>
            <img
              src="${pokemon.sprites.other.dream_world.front_default}"
              alt="${pokemon.name}"
            />
        </div>
      </li>
  `
}

const pokemonOlList = document.getElementById("pokemon-list")

pokeApi.getPokemons().then((pokemons = []) => {
  pokemonOlList.innerHTML = pokemons.map(convertPokemonToHtml).join("")
})
