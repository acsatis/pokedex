const port = 8080;
const express = require('express');
const app = express();

app.use('/api/alltypes', require('./alltypes'));
app.use('/api/pokemons', require('./pokemons'));
app.use('/', express.static('public_html'));
app.listen(port, () => console.log(`Server started on port ${port}.`));