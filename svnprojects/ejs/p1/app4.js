//npm install express

var express = require('express');

var path = require('path');

//for parsing in post request
var bodyParser = require('body-parser');

var app = express();

//for posting (middle layer)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
//end posting

//set static path
app.use(express.static(path.join(__dirname, 'public')));

//json file
app.get('/people', function(req, resp) {
	var people = [
		{
			first_name: "john",
			last_name: "doe",
			age: 34,
			gender: "male"
		},
		{
			first_name: "tom",
			last_name: "jackson",
			age: 27,
			gender: "male"
		},
		{
			first_name: "tracy",
			last_name: "smith",
			age: 30,
			gender: "female"
		}
	];
	
	resp.json(people);
});

//download file
app.get('/download', function(req, res) {
	res.download(path.join(__dirname, '/downloads/pdf-sample.pdf'));
});

//redirect
app.get('/about', function(req, res) {
	res.redirect('/about.html');
});

app.post('/subscribe', function(req, res) {
	var name = req.body.name;
	var email = req.body.email;
	console.log(name + ' has subscribed with ' + email);
	res.send('subscribed');
});

app.listen(3000, function() {
	console.log('Server started on port 3000');	
});
