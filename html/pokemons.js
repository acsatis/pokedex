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

console.log(pokes);

var ul = document.querySelector('ul');
pokes.forEach(function (element) {
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