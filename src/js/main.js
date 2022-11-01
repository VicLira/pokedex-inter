import "../css/global.css"

const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"

fetch(url)
  .then((response) => {
    return response.json()
  })
  .then((jsonBody) => {
    console.log(jsonBody)
  })
  .catch((error) => {
    console.log(error)
  })
  .finally(() => {
    console.log("Requisição concluída!")
  })
