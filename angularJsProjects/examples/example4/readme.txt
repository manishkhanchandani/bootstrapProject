<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular-route.js"></script>

Routing Overview

Part 1. AngularJS routes associate a view with a controller

Route: /customers
View: customers.html
Controller: customersController

Relies on ngRoute module (separate script)
<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular-route.js"></script>

Routes configured using $routeProvider

Part 2: Routing and Modules
1. Routes configured by calling angular.module.config()

2. $routeProvider injected dynamically

3. $routeProvider -> When -> /customers -> View: customers.html, Controller: customersController
$routeProvider -> When -> /orders -> View: orders.html, Controller: ordersController

Part 3: The ngRoute Module
1. AngularJS routing functionality is located in the ngRoute module
2. Add a <script> that loads angular-route.js 
3. Reference ngRoute in your module:
var demoApp = angular.module('demoApp', ['ngRoute']);


Part 4:  Configure Routes

1. var app = angular.module('customersApp', ['ngRoute']);
app.config(function ($routeProvider)    //$routeProvider injected dynamically
{
    //Routes go here
});


Part 5: Defining Routes using angular.config()

var app = angular.module('customersApp', ['ngRoute']);
app.config(function ($routeProvider)
{
    $routeProvider
    .when('/',
        {
        controller: 'CustomersController',
        templateUrl:'/app/views/customers.html'
        })
    .when('/orders',
        {
            controller: 'OrdersController',
            templateUrl:'/app/views/orders.html'
        })
    .otherwise({ redirectTo: '/' });
});


Part 6: Route Parameters
1. Route parameters can be defined using the : character
2. Example
app.config(function ($routeProvider) {
    $routeProvider
        .when('/editCustomer/:customerId',
        {
            controller: 'CustomerEditController',
            templateUrl:'/app/views/customerEdit.html'
        });
});
3. Example Route: /editCustomer/254

Part 7: Accessing Route Parameters in a Controller

1. Route parameters can be accessed through the $routeParams provider: 
    var app = angular.module('customersApp');
    app.controller('CustomerEditController',
        function($scope, $routeParams)
        {
            $scope.customerId = $routeParams.customerId;
        }
    );

Part 8: Using the ng-view Directive
Dynamically loaded views are injected into the shell page as a module loads:
<div ng-view></div>
<ng-view></ng-view>


Part 9: Summary
 AngularJS provides built-in support for routing and history management
 Routes associate a view with a controller
 Reference the ngRoute module
 $routeProvider injected into angular.module.config()