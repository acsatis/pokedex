const http = require('http');
const bl = require('bl');
const fs = require('fs');
let cache = {};
let path = './data/';

function fetch(container, serverUrl, callback) {
    if (cache[container]) return callback(cache[container]);
    fs.readFile(generateFileName(container), (err, data) => {
        if (err) return fetchFromServer(container, serverUrl, callback);
        cache[container] = JSON.parse(data.toString());
        callback(cache[container]);
    });
}

function fetchFromServer(container, serverUrl, callback) {
    http.get(serverUrl, response => {
        response.pipe(bl((err, data) => {
            if(err) return console.log(err);
            console.log(data.toString());
            const raw = JSON.parse(data.toString())['results'];
            const results = {};
            raw.forEach(result => {
                const id = result['url'].match(/(\d+)(?!.*\d)/)[0];
                results[id] = result;
            });
            console.log(results);
            if (cache[container]) {
                Object.assign(cache[container], results);
            } else {
                cache[container] = results;
            }
            fs.writeFile(generateFileName(container), JSON.stringify(cache[container]));
            callback(cache[container]);
        }));
    })
}

function generateFileName(container) {
    return path + container + '.json';
}

module.exports = fetch;