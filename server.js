var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//body parser before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const api = require('./routes/api');

var path = require('path');

app.use('/api', api);
app.use( express.static(__dirname + '/dist' ) );
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(4200);