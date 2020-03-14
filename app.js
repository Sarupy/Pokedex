const fetchPokemon = () => {
    const getPokemonUrl = id => 'https://pokeapi.co/api/v2/pokemon/' + id
    
    const pokemonPromises = []

    for (let i = 1; i <= 251; i++)
    {      
            pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))     
    }
    Promise.all(pokemonPromises)
    .then(pokemons => {
        const listPokemons = pokemons.reduce((accumullator, pokemon) =>  {
            const types = pokemon.types.map(typeInfo =>typeInfo.type.name )

            getStyle = style => getComputedStyle(document.documentElement).getPropertyValue(style);
         
            var cardHeader;
            var cardTypes

            if (types.length == 1) {
                cardHeader = '<li class="card ' + types[0] + '">'
            } else {
                cardHeader =  '<li class="card" style=" background-image: linear-gradient(45deg,'+ getStyle('--' +types[0]) + ' 30%, 50%, ' + getStyle('--' +types[1]) + ' 70%)">'
            } 
            accumullator += 
            cardHeader  +
            '<img class="card-image" src="https://pokeres.bastionbot.org/images/pokemon/'+ pokemon.id + '.png">' +
            '<h2 class="card-title">' + pokemon.id + '. ' + pokemon.name + '</h2>' +
            '<p class="card-subtitle">' + types.join(' | ') + '</p>'  +
            '</li>'
            return accumullator
          },'')
          const ul = document.querySelector('[data-js="pokedex"]')
          ul.innerHTML = listPokemons
          console.log(listPokemons)
        })
}

fetchPokemon()