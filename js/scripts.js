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
        let listpokemon = document.createElement('li');
        listpokemon.classList.add('list-group-item');
        let button = document.createElement('button');
        button.classList.add('btn')
        button.classList.add('btn-info')
        button.innerText = pokemon.name;
        button.classList.add('button-class');
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
                console.log(pokemon);
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

    function showModal(title, text, img, imgBack) {
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', img);
        imageElement.setAttribute('width', '304');
        imageElement.setAttribute('height', '228');
        imageElement.setAttribute('alt', 'pokemon picture front');

        let imageElementBack = document.createElement('img');


        imageElementBack.setAttribute('src', imgBack);
        console.log(imgBack)
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
    }



    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item.name, ' ' + 'height' + ' ' + item.height / 10 + ' ' + 'meters', item.imageUrlFront, item.imageUrlBack);
            console.log(item);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };

})();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
