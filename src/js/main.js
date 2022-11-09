import "../css/global.css";
import pokeApi from "./poke-api";

const pokemonOlList = document.getElementById("pokemon-list")
const allPokemonList = document.getElementById("all-pokemon-list")
const loadMoreButton = document.getElementById("load-more-button")

const limit = 12;
let offset = 0;
const generation = [151, 251, 386, 493, 649, 721, 807, 905]
const maxRecords = 48;


function loadPokemonItems(offset, limit) {

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(pokemon => 
      `<li class="pokemon ${pokemon.types[0]}">
        <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                  ${pokemon.types
                    .map((type) => `<li class="type ${type}">${type}</li>`)
                    .join("")}
                </ol>
                <img
                  src="${pokemon.photo}"
                  alt="${pokemon.name}"
                />
            </div>
          </li>
  `).join("")
    pokemonOlList.innerHTML += newHtml;
  })
}

function loadAllPokemons() {
  pokeApi.getAllPokemons().then((pokemons = []) => {
    const newHtml = pokemons.map(pokemon => 
      `<li class="pokemon ${pokemon.types[0]}">
        <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                  ${pokemon.types
                    .map((type) => `<li class="type ${type}">${type}</li>`)
                    .join("")}
                </ol>
                <img
                  src="${pokemon.photo}"
                  alt="${pokemon.name}"
                />
            </div>
          </li>
  `).join("")
    allPokemonList.innerHTML += newHtml;
  })
}

if (!loadMoreButton) {
  loadAllPokemons();
} else {
  loadPokemonItems(offset, limit);
  loadMore();
}


function loadMore() {
  loadMoreButton.addEventListener('click', () => {
    offset += limit;
  
    const qtdRecordNextPage = offset + limit;
  
    if (qtdRecordNextPage >= maxRecords){
      const newLimit = maxRecords - offset;
      loadPokemonItems(offset, newLimit)
  
      loadMoreButton.parentElement.replaceChild(loadAllButton, loadMoreButton)
    } else {
      loadPokemonItems(offset, limit)  
    }
  
    
  })
}


