var pokes = [
{
  "id": 1,
  "name": "Bulbasaur",
  "type": [ "grass", "posion" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
},
{
  "id": 5,
  "name": "Charmeleon",
  "type": [ "fire" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
},
{
  "id": 15,
  "name": "Beedrill",
  "type": [ "bug", "posion" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png"
},
{
  "id": 193,
  "name": "Yanma",
  "type": [ "bug", "flying" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/193.png"
},
{
  "id": 152,
  "name": "Chikorita",
  "type": [ "grass" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png"
},
];

console.log(pokes);

var ul = document.querySelector('ul');
pokes.forEach(function(element){
    var li = document.createElement('li');
    var img = document.createElement('img');
    var btn = document.createElement('button');
    var span = document.createElement('span');
    var p = document.createElement('p');
    li.className = "item-container poison";
    element.type.forEach(function (type){
        li.className += ' ' + type;
    });
    img.src = element.sprite;
    span.className = "item-name";
    span.textContent = element.name;
    span.appendChild(p);
    btn.appendChild(img);
    li.appendChild(btn);
    li.appendChild(span);
    ul.appendChild(li);
});