Intro
Single Page Applications
SPAs allow different views (screens) to be loaded into a shell page as the user interacts with the page
<div></div>

Single Page Application Views
Views can be replaced with other views
<div>View 1</div>

Single Page Applications
SPAs maintain a history of views that have been displayed
<div>View 2</div>

The Challenge with SPAs
 SPAs rely on many different technologies:
 DOM manipulation
 History
 Routing
 Ajax
 Data Binding
 More…


Part 1: Example 1

http://bootstrap.mkgalaxy.com/angularJsProjects/examples/example1/index.html


Step 1: Reference the angular js script

<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js"></script>


And/or add following if you want to use routing

<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular-route.js"></script>

Step 2: Add the ng-app Directive

Step 3: Bind Data using Directives
Name: <input type="text" ng-model="name">



Part 2: The Key to Learning AngularJS

1. Understand the available parts
2. Understand how the parts fit together
3. Understand how to organize parts

Parts Available
Module
    i. Config
    ii. Routes
    iii. UI
        a. View
        b. Directives
        c. Filters
    iv. Logic
        a. Controller
        b. Factory
        c. Service

UI and Logic is binded by $scope


Part 3: What are Modules?
    Modules are containers for:
        Controllers
        Routes
        Factories/Services
        Directives
        Filters

Part 4: What are Factories/Services?
    Factories and Services:
        Used to make RESTful calls
        Used to share data between controllers
        Used to handle custom logic
        Are Singletons

Part 5: What are Controllers?
    Controllers act as the "brain" for a view:
        Retrieve data from a factory/service and store it
        Handle events triggered by the view
        Know how to handle custom logic
        Rely on the $scope object to interact with the view
        
Part 6: What is Scope?
    $scope is the "glue" (ViewModel) between a controller and a view

Part 7 What are Views?
    Views render the user interface:
        Contain HTML and CSS
        Bind to data provided by a controller via the $scope object
        Use directives to enhance HTML and render data

Part 8 What are Routes?
    Each route has a unique path:
        Reference a controller and view
        Can include route parameters: /customers/:customerId
            - template url: customers.html
            - controller: customersController

Part 9 Summary
AngularJS is a full-featured SPA framework

 Applications are organized into one or more 

containers (modules)

 Different parts can be associated with a module:

 Controllers

 Factory/Service

 Directives

 Filters