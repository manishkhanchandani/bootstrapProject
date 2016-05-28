JAVASCRIPT FUNDAMENTALS

Javascript runs on the client side as oppose to the server.
Javascript has nothing to do with the Java programming language.


WHAT ARE SOME USES OF JAVASCRIPT?

HTML Form Validation
Event Handling - click, hover, etc.
Powers HTML5 Features
Search and form autocomplete
Animations
Jquery, Ajax and other libraries are all javascript


ADDING JAVASCRIPT TO AN HTML PAGE?

<!doctype html>
<html ng-app="myApp">
<head>
<meta charset="UTF-8">
<title>Title of the page</title>
	<script>
		//inline javascript goes here
	</script>
	<script language="javascript" src="myjs.js">
	</script>
	<script type="text/javascript" src="myjs.js">
	</script>
</head>

<body>

</body>
</html>


JAVASCRIPT VARIABLES

Variables should start with a letter
They are case sensitive
var x
	declares an empty variable called x
X = 4;
	declares a variable named x with a value of 4
var x = 4;
	declares a variable named x with a value of 4

JAVASCRIPT ARRAYS

Variables store one value (usually). Arrays store multiple values

var cars = new Array();
cars[0] = "Honda";
cars[1] = "Toyota";
cars[2] = "Ford";


var cars = new Array("Honda", "Toyota", "Ford");

JAVASCRIPT LOOPS

Loops are used to run the same code over and over until a certain condition is met.

For Loop - Loops through a block of code a number of times. You usually know the number of times.
While Loop - Loops through until a condition is true. You usually don't know the number of times.
For In Loop - Loops through array object values.

Syntax:
For Loop:
	for (var i = 0; i < 5; i++) {
		console.log('number is ' + i);
	}
While Loop:
	var i = 0;
	while (i < 5) {
		console.log('number is ' + i);
		i++;
	}

JAVASCRIPT FUNCTIONS

A function is a block of code that runs when it is called.

Create a Function:
function somefunction() {
	console.log("this is some function");
}

Call a function:
somefunction();

JAVASCRIPT OBJECTS

Everything is object in a javascript
Some built in objects: String, Date, Array

Objects have properties
Properties can be accessed like this..

ObjectName.propertyName

Example:
var greeting = "Hello";
var x = greetings.length;
x is equal to 5 as it is equal to the "length" property of the "greeting" variable.