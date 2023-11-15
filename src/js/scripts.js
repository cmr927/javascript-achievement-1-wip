let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1017';


    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('div');
        listpokemon.classList.add('col-md-3');
        listpokemon.classList.add('col-sm-4');
        listpokemon.classList.add('flex-column');
        listpokemon.classList.add('pokebutton');
        let button = document.createElement('button');
        button.classList.add('btn')
        button.classList.add('btn-info')
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        button.classList.add('w-75');
        button.classList.add('m-2');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#pokeModal')
        button.setAttribute('type', 'button')
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });

        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.types = details.types;
            item.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Search bar feature
    function searchPokemon() {
        let input = document.getElementById('searchbar').value
        input = input.toLowerCase();
        let x = document.getElementsByClassName('pokebutton');

        for (i = 0; i < x.length; i++) {
            let pokebutton = x[i].getElementsByClassName('btn')[0];
            let btn = pokebutton.innerText.toLowerCase()
            if (!btn.includes(input)) {
                x[i].style.display = "none";
            }
            else {
                x[i].style.display = "";
            }
        }
    }


    function showModal(title, text, img, imgBack, poketype, pokeabilities) {
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', img);
        imageElement.setAttribute('width', '304');
        imageElement.setAttribute('height', '228');
        imageElement.setAttribute('alt', 'pokemon picture front');



        let imageElementBack = document.createElement('img');


        imageElementBack.setAttribute('src', imgBack);
        imageElementBack.setAttribute('width', '304');
        imageElementBack.setAttribute('height', '228');
        imageElementBack.setAttribute('alt', 'pokemon picture back');


        let pokeName = document.querySelector('#pokeModalLabel');
        pokeName.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;


        let pokeInfo = document.querySelector('#pokeInfo');
        pokeInfo.innerHTML = '';
        pokeInfo.appendChild(imageElement);
        if (imgBack) {
            pokeInfo.appendChild(imageElementBack);
        }
        pokeInfo.appendChild(contentElement);


        let contentPoketype = document.createElement('p');
        contentPoketype.innerText = 'type:' + ' ';
        for (i = 0; i < poketype.length; i++) {
            let poketypeName = poketype[i].type.name;
            contentPoketype.innerText = contentPoketype.innerText + poketypeName + ' '
        }
        pokeInfo.appendChild(contentPoketype);


        let contentPokeAbilities = document.createElement('p');
        contentPokeAbilities.innerText = 'abilities:' + ' ';
        for (i = 0; i < pokeabilities.length; i++) {
            let pokeabilitiesName = pokeabilities[i].ability.name;
            contentPokeAbilities.innerText = contentPokeAbilities.innerText + pokeabilitiesName + ' '
        }
        pokeInfo.appendChild(contentPokeAbilities);


    }



    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item.name, ' ' + 'height:' + ' ' + item.height / 10 + ' ' + 'meters', item.imageUrlFront, item.imageUrlBack, item.types, item.abilities);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        searchPokemon: searchPokemon
    };

})();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
