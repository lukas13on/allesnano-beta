import express from 'express';
import path from 'path';

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (request, ressponse) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, function () {
    console.log('Visite o site em: http://localhost:' + port);
});