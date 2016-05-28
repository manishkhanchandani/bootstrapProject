Data Binding

JavaScript doesn't provide native support for data binding
Two-way data binding can lead to significant reductions in code

Control-Oriented
versus
Data-Oriented


A. Control-Oriented Development Workflow

Name: <input type="text" name="name" id="name" /> 
<input type="button" name="button" id="button" value="Submit">

1. Code assigns value to a textbox
document.getElementById("name").value = 'John Doe';
2. User modifies data
3. User clicks a button
4. Code pulls the value out of the textbox
var name = document.getElementById('name').value;

B. Data-Oriented Development Workflow

Name: <input type="text" bindProperty="name" />

1. Property is bound to a textbox
<input type="text" bindProperty="name" />
2. User modifies data
3. Property value is automatically updated!


C. What are Directives?
Directives teach HTML new tricks!

What can Directives Do?
    DOM Manipulation
    Data Binding
    Controllers / Modules
    View Loading
    Events
    
    
Examples of AngularJS Directives
    DOM Manipulation
        ng-hide
        ng-repeat
        ng-show
        ng-view
        
    Data Binding
        ng-bind
        ng-init
        ng-model

    Controllers / Modules
        ng-app
        ng-controller

    View Loading
        ng-view

    Events
        ng-click
        ng-keypress
        ng-mouseenter


D. Defining Directives
Directives can be defined multiple ways:
    <div ng‐hide="isHidden">
    <div data‐ng‐hide="isHidden">
    <ng‐view></ng‐view>


E. AngularJS Expressions
Expressions are code snippets placed in binding markup
{{1 + 1 }}

F. Iterating with the ng-repeat Directive
<div ng-init="fruits=['mango', 'apple']">
    <ul>
        <li ng-repeat="fruit in fruits">
        [{{$index + 1}}] {{fruit}}
        </li>
    </ul>
</div>

G. Filters and Pipes
AngularJS can "pipe" data through filtering, formatting, and sorting functions
Uses the | character

Key AngularJS Filters
    currency
    date
    filter
    json
    limitTo
    lowercase
    number
    orderBy
    uppercase
    
orderBy example
    <div ng-init="fruits2=[{name:'mango', grade:'A', price: 9.99}, {name:'apple', grade:'B', price: 12.99}]">
        <ul>
            <li ng-repeat="fruit in fruits2 | orderBy:'name'">
          [{{$index + 1}}] {{fruit.name}} - {{fruit.price | currency}}
        </li>
        </ul>
    </div>


Filtering Data example
    <div ng-init="customers=[{name:'john', city:'San Francisco', orderTotal: 9.99}, {name:'dilip', city:'Oakland', orderTotal: 12.99}]">
        <input type="text" ng-model="nameText" />
        <ul>
            <li ng-repeat="cust in customers | orderBy:'name'">
          [{{$index + 1}}] {{cust.name}} - {{cust.city}} - {{cust.orderTotal | currency}}
        </li>
        </ul>
    </div>
    
Summary

Views handle UI functionality

Directives enhance HTML:
 Manipulate the DOM
 Used to reference model properties
 Iterate over data and generate HTML
 Much more..

Filters are used to format, sort, or filter data