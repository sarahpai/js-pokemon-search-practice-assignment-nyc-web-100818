document.addEventListener('DOMContentLoaded', () => {
  const pokemonContainer = document.querySelector("#pokemon-container")
  const pokemonSearch = document.querySelector("#pokemon-search-input")
  let allPokemonData = []


  pokemonSearch.addEventListener('input', function(e) {
    const inputSearchTerm = e.target.value
    const filterSearchTerm = allPokemonData.filter(function(pokemonObj) {
      return pokemonObj.name.includes(inputSearchTerm)
    })
    const pokeHTML = renderAllPokemon(filterSearchTerm)
    pokemonContainer.innerHTML = pokeHTML
    })


    pokemonContainer.addEventListener('click', function(event){
      if(event.target.dataset.action === 'flip') {
        const clickedPokemon = allPokemonData.find(function(pokemon){
          return pokemon.id == event.target.dataset.id
        })
        if (event.target.src === clickedPokemon.sprites.front) {
            event.target.src = clickedPokemon.sprites.back
        } else {
          event.target.src = clickedPokemon.sprites.front
        }
      }
    })




  fetch('http://localhost:3000/pokemon', {method: 'GET'})
    .then(function(responsePromise) {
      return responsePromise.json()
     })
    .then(function(pokemonDataJSON) {
      allPokemonData = pokemonDataJSON
      pokemonContainer.innerHTML = renderAllPokemon(pokemonDataJSON)
    })

}) //end of dom contentload

function renderAllPokemon(pokemonCollection) {
  return pokemonCollection.map(function(pokemonObject) {
    return `
      <div class="pokemon-container">
      <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
        <h1 class="center-text">${pokemonObject.name}</h1>
        <div style="width:239px;margin:auto">
          <div style="width:96px;margin:auto">
            <img data-id="${pokemonObject.id}" data-action="flip" class="toggle-sprite" src="${pokemonObject.sprites.front}">
          </div>
        </div>
      </div>
    </div>
      `
  }).join('')
}
