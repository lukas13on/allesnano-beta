var express = require('express');
const chromeLauncher = require('chrome-launcher');
var app = express();
var fs = require('fs');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

fs.readFile('static/index.html', function (err, data) {
    if (err) {
        throw err;
    }

    app.get('/', function (request, response) {
        response.setHeader('Content-Type', 'text/html');
        response.send(data);
    });

    app.listen(app.get('port'), function () {

        console.log("Node app is running at localhost:" + app.get('port'));

        // Inicia o Chrome
        chromeLauncher.launch({
            startingUrl: 'http://localhost:' + app.get('port'),
        }).then(chrome => {
            console.log(`Chrome debugging port running on ${chrome.port}`);
        });

    });



});