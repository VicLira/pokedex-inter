import "../css/global.css";
import pokeApi from "./poke-api";

const app = document.getElementById("app")
const pokemonOlList = document.getElementById("pokemon-list")
const loadMoreButton = document.getElementById("load-more-button")
const modal = document.getElementById("modal")


const modalContent = modal.children[0].lastElementChild
const modalImg = modal.children[0].children[1]
const modalName = document.getElementById('modal-name');
const modalWeight = document.getElementById('modal-weight');
const modalHeight = document.getElementById('modal-height');
const modalMoves = document.getElementById('moves');



const closeModalElement = document.getElementById("close-modal")


let limit = 12;
let offset = 0;
const generation = [151, 251, 386, 493, 649, 721]
const maxRecords = 48;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    
    
    const newHtml = pokemons.map(pokemon => 
      `
      <li class="pokemon ${pokemon.type}">
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
            <div class="pokemon-wrapper" id="${pokemon.number-1}"></div>
      
      </li>
  `).join("")
    pokemonOlList.innerHTML += newHtml;
  })
}


if (!loadMoreButton) {
  loadPokemonItems(offset, limit=649)
} else {
  loadPokemonItems(offset, limit);
  loadMore();
}


function loadMore() {
  loadMoreButton.addEventListener('click', () => {
    offset += limit;
  
    asyncCall();
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




closeModalElement.addEventListener('click', () => {
  modal.classList.toggle('active')
})

function openModal(src, name, weight, height, moves) {
  modal.classList.toggle('active')

  modalImg.src = src;
  modalName.innerHTML = name;
  modalWeight.innerHTML = `${weight/10} kilos`;
  modalHeight.innerHTML = `${height/10} metros`;
  modalMoves.children[0].innerHTML = moves[0]
  modalMoves.children[1].innerHTML = moves[1]
  modalMoves.children[2].innerHTML = moves[2]
  modalMoves.children[3].innerHTML = moves[3]

  console.log(modalImg)
}


function loadPokemons() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(document.querySelectorAll('.pokemon'));
    }, 1000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await loadPokemons();
  result.forEach((pokemon) => {
    pokemon.addEventListener('click', (e) => {
      const pokemonId = e.target.id
      pokeApi.getPokemonById(pokemonId)
        .then((pokemon) => {
          
        const src = pokemon.photo
        const name = pokemon.name
        const weight = pokemon.weight
        const height = pokemon.height
        const moves = pokemon.moves
        openModal(src, name, weight, height, moves)
      })
      
    })
  })
  
}

asyncCall();



