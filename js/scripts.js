let pokemonRepository = (function () {
    let pokemonList = [
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
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon &&
            'abilities' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function showDetails(pokemon) {

        console.log(pokemon.name);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener('click', function (event) {
            showDetails(pokemon)
            console.log();
        }

        );
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
}())

pokemonRepository.add({ name: 'Pikachu', height: 0.3, types: ['electric'], abilities: ['Static', 'Lightningrod'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});