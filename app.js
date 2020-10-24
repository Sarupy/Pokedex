const fetchPokemon = () => {
    const getPokemonUrl = id => 'https://pokeapi.co/api/v2/pokemon/' + id
    
    const pokemonPromises = []

    for (let i = 1; i <= 151; i++)
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
                cardTypes = '<div style="background-color:var(--' + pokemon.types[0].type.name + ');border-color:var(--' + pokemon.types[0].type.name + ') " class="card-type ' + pokemon.types[0].type.name + '">' + pokemon.types[0].type.name.toUpperCase() + '</div>'  
            } else {
                cardTypes = '<div style="background-color:var(--' + pokemon.types[0].type.name + ');border-color:var(--' + pokemon.types[0].type.name + ') " class="card-type ' + pokemon.types[0].type.name + '">' + pokemon.types[0].type.name.toUpperCase() + '</div>' + 
                            '<div style="background-color:var(--' + pokemon.types[1].type.name + ');border-color:var(--' + pokemon.types[1].type.name + ') " class="card-type ' + pokemon.types[1].type.name + '">' + pokemon.types[1].type.name.toUpperCase() + '</div>'

            } 
            accumullator += 
            '<li class="card">'  +
            '<h1 class="card-title"> #' + (pokemon.id + "").padStart(3, "0") + '</h1>' +
            '<img class="card-image" src="https://pokeres.bastionbot.org/images/pokemon/'+ pokemon.id + '.png">' +
            '<h1 class="card-title">' + pokemon.name + '</h1>' +
            cardTypes  +
            '</li>'
            return accumullator
          },'')
          const ul = document.querySelector('[data-js="pokedex"]')
          ul.innerHTML = listPokemons
          console.log(listPokemons)
        })
}

fetchPokemon()