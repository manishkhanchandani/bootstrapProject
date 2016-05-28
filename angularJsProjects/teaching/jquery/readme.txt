JQUERY FUNDAMENTALS

Jquery is a multi browser javascript library
It is nothing more than a bunch of javascript code
Jquery makes it easy to navigate a document and select DOM elements
Jquery handles events effectively (mousedown, keydown, etc)
You can use Jquery to create plugins on top of the javascript library


WHAT CAN WE DO WITH JQUERY?

Effects and Animations (Slideshows, tabs, etc)
Handle Events(clicks, toggle, hover, etc)
Feature Detection
Manipulate the DOM (Document Object Model)
Develop Ajax applications and work with Ajax
Much more...

USING JQUERY

You can download jquery from jquery.com and include it in your html document.
<script src="jquery.js"></script>
You can also use a hosted library such as google and simply include the link in your document
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
You can see all of Google's libraries at:
http://developers.google.com/speed/libraries


DOCUMENT READY HANDLER

When we include our external jquery scripts or we add jquery to the <head> area, we need to first check if the document is ready. If we do not do this, then our jquery code will run before the rest of the code in which we are trying to use or modify. We can do this with the following syntax...

$(document).ready(function() {
	//all jquery code goes here
});

SELECTING ELEMENTS

One of the reasons that jquery is so powerful is that we can grab and select virtually anything in the DOM. This could be divs, lists, paragraphs or any other tag or element. The way we do this is wrapping them in $("")

$("div") - will select all <div> tags
$("#myDiv") - will select the div with the id of myDiv
$("p.myclass") - will select the p with the class of myClass

JQUERY ACTIONS

Once we grab something with a selector, we can do things with it such as call an action.

The .addClass() action will add the class "myClass" to all <div>s
$("div").addClass("myClass");

The .css() action will let us add css style to an element
$('#myClass").css("color", "red");

We can get all of the html inside an element using .html()
var myElement = $("#myElement").html();


JQUERY EVENTS

We can use Jquery to handle events. To use the click event ...

$("a").click(function() {
	//do something when a link (<a> tag) is clicked
});

Some other events
	Blur
	Focus
	Hover
	Key down
	Load

SHOW/HIDE ELEMENTS

We can show and hide elements with Jquery

$("myelement").hide(function() {
	//do something once the element is hidden
});
$("myelement").show(function() {
	//do something once the element is shown
});
$("myelement").toggle(function() {
	//do something once the element is shown/hidden
});

ANIMATIONS

We can add animations to elements with Jquery


$("myelement").slideDown("fast", function() {
	//do something when slide down is finished
});

$("myelement").slideUp("slow", function() {
	//do something when slide up is finished
});

$("myelement").slideToggle(1000, function() {
	//do something when slide up/down is finished
});
