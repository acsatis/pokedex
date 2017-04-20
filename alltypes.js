const fetch = require('./fetch');
const router = require('express').Router();
const serverUrl = 'http://pokeapi.co/api/v2/type/';
const container = 'alltypes';

router.get('/', function (req, res) {
    fetch(container, serverUrl, types => res.end(JSON.stringify(Object.keys(types).map(type => types[type]['name']))));
});

module.exports = router;