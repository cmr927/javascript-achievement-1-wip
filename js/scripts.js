let pokemonList = []
pokemonList = [
    {
        name: 'Geodude',
        height: 0.4,
        types: ['Rock', 'Ground'],
        abilities: ['Sturdy', 'Sand-veil', 'Rock-head']
    },

    {
        name: 'Graveler',
        height: 1,
        types: ['Rock', 'Ground'],
        abilities: ['Sturdy', 'Sand-veil', 'Rock-head'],
    },

    {
        name: 'Golem',
        height: 1.4,
        types: ['Rock', 'Ground'],
        abilities: ['Sturdy', 'Sand-veil', 'Rock-head'],
    },

];
pokemonList.forEach(function(pokemonList){
    if (pokemonList.height > 1.3) { //if pokemon's height is over 1.4 meters also print 'Wow that's big!'
        document.write(pokemonList.name + ' (height: ' + pokemonList.height + ' meters) - Wow, that\'s big! <br>');
    }
    else {
        document.write(pokemonList.name + ' (height: ' + pokemonList.height + ' meters) <br>');
    }
})
