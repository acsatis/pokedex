const router = require('express').Router();
const fetch= require('./fetch');
const serverUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=811';
const container = 'pokemons';

router.get('/', function (req, res) {
    fetch(container, serverUrl, data => {
        const limit = Number(req.query['limit']) || 20;
        const offset = Number(req.query['offset']) || 0;
        const results = Object.keys(data).map(key=> data[key]);
        res.end(JSON.stringify({
            'count' : results.length,
            'results' : results.filter((el, index) => ((index >= offset) && (index < (offset + limit)))),
            'next' : req.protocol + '://' + req.get('Host') + '/api/pokemons?offset=' + (offset + limit) + "&limit=" + limit
        }));
    });
});

module.exports = router;