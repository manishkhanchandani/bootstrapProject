http://bootstrap.mkgalaxy.com/angularJsProjects/examples/example3/index.html

A. AngularJS Architecture Patterns

AngularJS relies on two key architecture patterns:
 Model-View-Controller (MVC)
 Model-View-ViewModel (MVVM)   

Patterns provide prescriptive guidance that can be
used to build applications

Also called MVC + MVVM = MV*


                Model
Web Request ->  Controller
                Scope
Web Response <- View


B. Controllers
Controllers act as the "brain" for a view:
 Defines properties and methods
 Handles showing/hiding controls and data in a view
 Handles events triggered by a view
 Knows how to retrieve data
 Interacts with the view using the $scope object

C. The Role of $scope
• $scope is "injected" into a controller
• Acts as the ViewModel
• Views bind to scope properties and functions

D. Creating a Controller
Note: Starting with AngularJS version 1.3.0 controller functions must be placed
inside modules.

Tying a View and Controller Together
<script>
function SimpleController($scope) {
    $scope.customers = [
        { name: 'Danny Wallace', city: 'Phoenix' },
        { name: 'Jamie Riley', city: 'Atlanta' },
        { name: 'Heedy Thomas', city: 'Chandler' },
        { name: 'Jeff James', city: 'Seattle' }
    ];
}
</script>
<h2>Controller</h2>
<div ng-controller="SimpleController">
    <h3>Adding a Simple Controller</h3>
    <ul>
        <li ng-repeat="cust in customers">
            {{ cust.name }} ‐ {{ cust.city }}
        </li>
    </ul>
</div>

E. What is a Module?
Modules are containers for:
 Controllers
 Routes
 Factories/Services
 Directives
 Filters

Modules are Containers
<html ng‐app="moduleName">

Modules
    Config
        Routes
    Filter
    Directive
    Factory & Services
    Controller


Defining a Module
Create a module using angular.module():
var demoApp = angular.module('demoApp', []);

Injecting Dependencies into a Module
 Modules may rely on functionality from other modules
 Helper modules can be "injected" into a module:
    var demoApp = angular.module('demoApp', ['helperModule']);

Adding a Controller to a Module

Option 1:
var demoApp = angular.module('demoApp', []);

demoApp.controller('SimpleController', function ($scope) {
    $scope.customers = [
        { name: 'Dave Jones', city: 'Phoenix' },
        { name: 'Jamie Riley', city: 'Atlanta' },
        { name: 'Heedy Wahlin', city: 'Chandler' },
        { name: 'Thomas Winter', city: 'Seattle' }
    ];
});

Option 2:
//Adding a Controller to a Module: Option 2

var demoApp = angular.module('demoApp', []);

angular.module('demoApp').controller('SimpleController', function ($scope) {
    $scope.customers = [
        { name: 'Dave Jones', city: 'Phoenix' },
        { name: 'Jamie Riley', city: 'Atlanta' },
        { name: 'Heedy Wahlin', city: 'Chandler' },
        { name: 'Thomas Winter', city: 'Seattle' }
    ];
});

Option 3:
//Adding a Controller to a Module: Option 3
var demoApp = angular.module('demoApp', []);

(function() {
    var SimpleController = function ($scope) {
        $scope.customers = [
            { name: 'Dave Jones', city: 'Phoenix' },
            { name: 'Jamie Riley', city: 'Atlanta' }
        ];
    };
    angular.module('demoApp')
    .controller('SimpleController', SimpleController);
}());

Dealing with Minification

angular.module('demoApp')
.controller('SimpleController', ['$scope', function ($scope) {
    $scope.customers = […];
}]);
OR
var SimpleController = function ($scope) {
    $scope.customers = […];
};
SimpleController.$inject = ['$scope'];
angular.module('demoApp')
.controller('SimpleController', SimpleController);