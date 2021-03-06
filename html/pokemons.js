(() => {
    const colors = {
        "fighting": "#C22E28",
        "fire": "#EE8130",
        "electric": "#F7D02C",
        "ground": "#E2BF65",
        "rock": "#B6A136",
        "bug": "#A6B91A",
        "grass": "#7AC74C",
        "ice": "#96D9D6",
        "water": "#6390F0",
        "steel": "#B7B7CE",
        "flying": "#A98FF3",
        "dragon": "#6F35FC",
        "ghost": "#735797",
        "poison": "#A33EA1",
        "fairy": "#D685AD",
        "psychic": "#F95587",
        "normal": "#A8A77A",
        "dark": "#705746"
    };
    const spinner = document.querySelector(".spinner");
    const filterPanel = document.querySelector("#filterPanel");
    const filter = document.querySelector("#filter");
    const ul = document.querySelector('ul');
    let pokemons = [];
    let next = null;

    fetchPokemons("//pokeapi.co/api/v2/pokemon/?limit=18");

    filter.addEventListener("input", event => {
        renderPokemons(pokemons.filter(pokemon => pokemon.searchString.indexOf(event.target.value) !== -1));
    });

    document.addEventListener('scroll', () => {
        if (document.body.scrollHeight - 1 <= window.innerHeight + document.body.scrollTop) {
            if (next !== null) fetchPokemons(next);
        }
    });

    function fetchPokemons(url) {
        spinner.style.display = "block";
        fetch(url)
            .then(response => response.json())
            .then(downloadedPokemons => {
                next = downloadedPokemons.next;
                pokemons = pokemons.concat(downloadedPokemons.results.map(pokemon => ({
                    "id": parseInt(pokemon.url.match(/(\d+)(?!.*\d)/)[0], 10),
                    "url": pokemon.url,
                    "name": pokemon.name,
                    "type": [],
                    "sprite": "",
                    "searchString": pokemon.name
                })));
                spinner.style.display = "none";
                filterPanel.style.display = "block";
                renderPokemons(pokemons);
                downloadPokeDetails();
            })
            .catch(ex => {
                console.log("Parsing failed", ex);
            });
    }

    function downloadPokeDetails() {
        pokemons.forEach((pokemon, index) => {
            const savedPokemon = localStorage.getItem(pokemon.id);
            if (savedPokemon !== null) {
                pokemons[index] = JSON.parse(savedPokemon);
                renderPokemons(pokemons);
            } else {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(downloadedPokemon => {
                        console.dir(downloadedPokemon);
                        pokemon.type = downloadedPokemon.types.map(details => {
                            const type = details.type.name;
                            pokemon.searchString += "###" + type;
                            return type;
                        });
                        pokemon.sprite = downloadedPokemon.sprites.front_default;
                        localStorage.setItem(pokemon.id, JSON.stringify(pokemon));
                        renderPokemons(pokemons);
                    })
                    .catch(ex => {
                        console.log("Error details", ex);
                    });
            }
        })
    }

    function renderPokemons(pokemonsToRender) {
        ul.innerHTML = "";
        pokemonsToRender.forEach(pokemon => {
            ul.appendChild(renderPokemon(pokemon));
        });
    }

    function renderPokemon(pokemon) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        const img = document.createElement('img');
        const span = document.createElement('span');
        const p = document.createElement('p');
        li.className = "item-container";
        if (pokemon.type.length === 1) {
            li.style.background = colors[pokemon.type[0]];
        } else {
            let bg = "background: linear-gradient(90deg, ";
            pokemon.type.forEach(type => {
                bg += colors[type] + " 50%, ";
            });
            bg = bg.substring(0, bg.length - 2);
            bg += ");";
            li.setAttribute('style', bg);
        }
        let name = pokemon.name + "<br>";
        pokemon.type.forEach(type => {
            name += type + " ";
        });
        span.className = "item-name";
        span.innerHTML = name;
        span.appendChild(p);
        btn.appendChild(img);
        li.appendChild(btn);
        if ("" === pokemon.sprite) {
            img.src = "spinner.gif"
        } else {
            img.src = pokemon.sprite;
        }
        li.appendChild(span);
        return li;
    }
})();
