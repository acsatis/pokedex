var pokes = [
    {
        "id": 1,
        "name": "Bulbasaur",
        "type": ["grass", "poison"],
        "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },
    {
        "id": 5,
        "name": "Charmeleon",
        "type": ["fire"],
        "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
    },
    {
        "id": 15,
        "name": "Beedrill",
        "type": ["bug", "poison"],
        "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png"
    },
    {
        "id": 193,
        "name": "Yanma",
        "type": ["bug", "flying"],
        "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/193.png"
    },
    {
        "id": 152,
        "name": "Chikorita",
        "type": ["grass"],
        "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png"
    }
];

var colors = {
    "fire": "#F08030",
    "grass": "#78C850",
    "poison": "#A040A0",
    "water": "#6890F0",
    "bug": "#A8B820",
    "flying": "#A890F0"
};

var itemcountSpan = document.querySelector("#itemcount");

//console.log(pokes);

fetch("//pokeapi.co/api/v2/pokemon/?limit=10")
.then(function(response){
    return response.text();
    console.log(response);
})
.then(function(body){
    console.log(body);
    var parsedBody = JSON.parse(body);
    console.log(parsedBody.results);
    var pokemons = parsedBody.results.map(function(poke){
        return {
        "id": 1,
        "name": poke.name,
        "type":[],
        "sprite": ""}
    });
    
    downloadPokeDetails(parsedBody.results, pokemons, pokemons.length);
})
.catch(function(ex){
    console.log("parsing failed", ex);
});

function downloadPokeDetails(serverpokemons, pokemons, count){
    console.log("item count", count);
    // console.log("url:", serverpokemons[count-1].url);
    fetch(serverpokemons[count-1].url)
    .then(function(response){
        return response.text();
    })
    .then(function(body){
        var parsedBody = JSON.parse(body);
        pokemons[count-1].type = parsedBody.types.map(function(details){ return details.type.name; });
        pokemons[count-1].sprite = parsedBody.sprites.front_default;
        if(count === 1){
            renderPokemons(pokemons);
        }
        else{
            downloadPokeDetails(serverpokemons, pokemons, count-1);
        }
        itemcountSpan.textContent = count -1;
    })
    .catch(function(ex){
        console.log("Error details", ex);
        if(count === 1){
            renderPokemons(pokemons);
        }
        else{
            downloadPokeDetails(serverpokemons, pokemons, count-1);
        }
    });
};



function renderPokemons(pokemons){
    var ul = document.querySelector('ul');
    pokemons.forEach(function (element) {
        var li = document.createElement('li');
        var img = document.createElement('img');
        var btn = document.createElement('button');
        var span = document.createElement('span');
        var p = document.createElement('p');
        li.className = "item-container";
        if (element.type.length === 1) {
            li.style.background = colors[element.type[0]];
        } else {
            var bg = "background: linear-gradient(90deg, ";
            element.type.forEach(function (type) {
                bg += colors[type] + " 50%, ";
            });
            bg = bg.substring(0, bg.length-2);
            bg += ");";
            li.setAttribute('style', bg);
        }
        img.src = element.sprite;
        span.className = "item-name";
        span.textContent = element.name;
        span.appendChild(p);
        btn.appendChild(img);
        li.appendChild(btn);
        li.appendChild(span);
        ul.appendChild(li);
    });
}

