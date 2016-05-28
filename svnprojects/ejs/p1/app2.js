//npm install express

var express = require('express');

var path = require('path');

var app = express();

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', function(req, res) {
	res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/services', function(req, res) {
	res.sendFile(path.join(__dirname, 'services.html'));
});

app.listen(3000, function() {
	console.log('Server started on port 3000');	
});
