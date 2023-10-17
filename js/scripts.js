let pokemonRepository = (function () {
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


    function add(pokemon) {
        if (typeof pokemon === 'object' && compare(Object.keys(pokemon), ['name', 'height', 'types', 'abilities'])) {
            pokemonList.push(pokemon);
        }
    }


    function compare(array1, array2) {
        var is_same = (array1.length == array2.length) && array1.every(function (element, index) {
            return element === array2[index];
        }
        );

        return is_same

    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };

})();

pokemonRepository.getAll().forEach(function (pokemon) {

    if (pokemon.height > 1.3) { //if pokemon's height is over 1.4 meters also print 'Wow that's big!'
        document.write(pokemon.name + ' (height: ' + pokemon.height + ' meters) - Wow, that\'s big! <br>');
    }
    else {
        document.write(pokemon.name + ' (height: ' + pokemon.height + ' meters) <br>');
    }
})
