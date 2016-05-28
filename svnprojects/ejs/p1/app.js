//npm install express

var express = require('express');

var app = express();

app.get('/', function(req, res) {
	res.send('hello world');
});

app.get('/about', function(req, res) {
	res.send('<h1>about us</h1>');
});

app.listen(3000, function() {
	console.log('Server started on port 3000');	
});
