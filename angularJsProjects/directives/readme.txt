Directives in Angular JS

Concepts
1. DDOs (Directive definition Objects)
2. The $compile service
3. The link() function
4. pre vs post link
5. The interpolate service
6. Working with $parse and eval()
7. Transclusion
8. Isolate Scope
9. Using controllers and views

Chapters
A. Getting started with directives
B. Shared and Isolate Scope
C. The Link Function
D. Using controllers


A. Getting started with directives


Part 1: The Role of Directives
    What are Directives?
    
    Directives Teach HTML New Tricks
    
    Markers on a DOM element that tell AngularJS's HTML compiler ($compile) to attach a specified behavior to that DOM element...
    <div my-directive></div>


    What can Directives Do?
        Manipulate the DOM
        Iterate through Data
        Handle Events
        Modify CSS
        Validate Data
        Data Binding
        Etc.

    Lot of built in directives in AngularJS
        Forms
            ng-maxlength
            ng-minlength
            ng-pattern
            ng-required
            ng-submit
        Behavior
            ng-blur
            ng-change
            ng-checked
            ng-click
            ng-key*
            ng-mouse*
        Data Binding
            ng-bind
            ng-href
            ng-init
            ng-model
            ng-src
            ng-style
         Application
            ng-app
            ng-controller
         DOM
            ng-disabled
            ng-cloak
            ng-hide
            ng-if
            ng-repeat
            ng-show
            ng-switch
            ng-view

    3rd Party Directives
        UI Bootstrap
        AngularStrap
        Angular UI Grid
        Angular Translate

Part 2: Creating a Hello World Directive
HTML File: index.html
<!doctype html>
<html ng-app="directivesModule">
<head>
<meta charset="UTF-8">
<title>Hello World Directive</title>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js"></script>
<script language="javascript" src="helloWorldDirective.js"></script>
</head>

<body>
    <div hello-world></div>
    <hello-world></hello-world>
</body>
</html>


JS File: helloWorldDirective.js
(function() {
    var app = angular.module('directivesModule', []);
    app.directive('helloWorld', function() {
        return {
            template: 'Hello World'
        }; //this return object is called DDO, i.e. directive definition object
    });
}());


Part 3: Directive Categories
    a. DOM - Driven Directives
        All about DOM Manipulation
    b. Data - Driven Directives
        All about data, using other directives and a controller
    c. Behaviour - Driven Directives
        All about handling DOM events

Part 4: Directive Types

Attribute directives
    <span my-dir="exp"></span>

Element directives
    <my-dir></my-dir>

CSS class directives
    <span class="my-dir: exp;"></span>

Comment directives
<!-- directive: my-dir exp -->


Part 5: Directive Building Blocks

    $compile (The $compile provider)
        "compiles an HTML string or DOM into a template and produces a template function, which can then be used to link scope and the template together."
    DDO - Directive Definition Object
    template    -> $compile -> Template Function -> Takes Scope (through DDO) -> Outputs HTML
    
    
    $compile and the Directive Definition Object (DDO)
        $compile provider relies on a Directive Definition Object (DDO)
        
        Features of the DDO:
            Defines the template for the directive
            Can include DOM manipulation code
            Can define a controller for the directive
            Controls the directive's scope
            Defines how the directive can be used
            More...
         
         Key DDO Properties
            restrict
            template
            templateUrl
            scope
            controller
            link
            
         Examples:
            angular.module('moduleName').directive('myDirective', function() {
                return {
                    restrict: 'EA',
                    scope: {},
                    template: '<div>{{myVal}}</div>',
                    controller: controller,
                    link: function (scope, element, attrs) {}
                }
            });


Summary
•
• •
Directives play a critical role in AngularJS applications 
§ Render HTML
§ Manipulate the DOM
§ Handle Events
§ Much more
Directives can be defined and used in many ways
The Directive Definition Object (DDO) is the building block of custom directives





B. Shared and Isolate Scope

    i. Shared and Isolate Scope
    ii. @ local scope
    iii. = local scope
    iv. & local scope
    
    i. Shared and Isolate Scope
        Parent Scope
        Child Scope
        
        Isolate Scope
        
        
        Shared Scope
            Controller
                scope.customers
            Directive
                can access scope.customers
         Isolate Scope
            Controller
                scope.customers
            Directive
                scope.isolated = true


Shared Scope Directive Example

var app = angular.module('myModule', []);
app.controller('Controller', ['$scope', function ($scope) { $scope.customer = {
        name: 'David',
        street: '1234 Anywhere St.'
    };
}]);
Scope is inherited
app.directive('sharedScope', function () { return {
template: 'Name: {{customer.name}} Street: {{customer.street}}' };
});
<div shared-scope></div>


Isolating Scope in Directives
angular.module('myModule')
    .directive('isolateScope', function () {
        return {
            scope: {}, //isolate scope
            template: 'Name: {{customer.name}} Street: ' +
                      '{{customer.street}}'
}; });
<div isolate-scope></div>
When you will use above code, no data will be displayed because there is no variable with customer available in this directive.



@ Local Scope Property
This is one way property, when value is updated in directive, it will not affect the original
//following defined in some controller
$scope.first='Dave';

My directive in html
<my-directive name="{{first}}" />

My directive in JS
scope: { name: '@' }

Directive can access a string value

= Local Scope Property
This is two way property, bi-directional binding

$scope.person = {name:'Dave'}

<my-directive customer="person" />

My directive in JS
scope: { customer: '=' }

Two way binding created

& Local Scope Property

$scope.click = function() {};

<my-directive action="click()" />

My Directive in JS
scope: {
    action: '&'
    }

It can invoke external function

Summary
@ Bind a local scope property to the value of a DOM attribute. The
result is always a string.
scope: { name: '@' } à <my-directive name="{{name}}" />
= Creates a bi-directional binding between a local scope property and
the parent scope property.
scope: { name: '=' } à <my-directive name="name" />
& Execute an expression/function in the context of the parent scope. scope: { click: '&' } à <my-directive click="click()" />



The link() function

    Topics
        Simple link() function demo
        Building a TableHelper Directive
        Requiring ngModel
        Using $parse and $eval
        Building a Google maps directive
        Using $compile and $interpolate
        Is link() always appropriate?
        
    Link Function Parameters
        Basic structure

(function() {

  var linkDemo = function () {
      return {
          link: function(scope, elem, attrs) {
            //scope can be isolate or shared
            //element directive is on
            //attributes on element
          }
      };
  };

  angular.module('directivesModule', [])
    .directive('linkDemo', linkDemo);

}());


        Jqlite is a tiny, api-compatible subset of jquery that allows angular to manipulate the DOM.
        Key Jqlite functions
            angular.element()
            addClass()/css()
            attr()
            on()/off()
            find() //find by tagname
            append()/remove()
            html()/text()
            ready()

Example 1: link.html and link.js
link.html
<!doctype html>
<html ng-app="directivesModule">
<head>
<meta charset="UTF-8">
<title>Untitled Document</title>
</head>

<body>
        <h3>Simple DOM Directive</h3>
        Mouse over the Click Me! area of click it.<br /><br />
        <div link-demo>Click Me!</div>

<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js"></script>
<script src="link.js"></script>
</body>
</html>

link.js
(function() {

  var linkDemo = function () {
      return {
          restrict: 'A',
          link: function(scope, elem, attrs) {
              elem.on('click', function() {
                  elem.html('You clicked me');
              });
              elem.on('mouseenter', function() {
                  elem.css('background-color', 'yellow');
              });
              elem.on('mouseleave', function() {
                  elem.css('background-color', 'white');
              });
          }
      };
  };

  angular.module('directivesModule', [])
    .directive('linkDemo', linkDemo);

}());

Example 2 TableHelper Directive


Four types of watch
    Method 1:
        attrs.$observe('ngModel', function(value) {
              scope.$watch(value, function(newValue) {
                  render();
              });
          });
    Method 2:
        scope.$watch(attrs.ngModel, render);
    Method 3:
        scope.$watch(function() {
            return ngModel.modelValue;
        }, function(newValue) {
            render();
        });
    Method 4:
        ngModel.$render = function() {
            render();
        };


CONTROLLER
    Using controller in a directive
    Replacing Link() with a controller
    Using controllerAs
    Adding controller to TableHelper
    Passing parameters out of a directive
    Understanding Transclusion
    
    
    Example:
    angular.module('directivesModule')
        .directive('WithController', function() {
            return {
                restrict: 'EA',
                scope: {}
                controller: function($scope) {},
                template: '<div></div>'
            };
        });
        
    angular.module('directivesModule')
        .directive('WithController', function() {
            return {
                restrict: 'EA',
                scope: {}
                controller: function($scope) {},
                controllerAs: 'vm',
                bindToController: true,
                template: '<div></div>'
            };
        });