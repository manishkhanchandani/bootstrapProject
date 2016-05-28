
Angular JS

1. we will use angularjs, bootstrap
2. Custom Attribute, lets write something in HTML
	<h1>Hello World</h1>
	lets add attribute to this element
	<h1 style=“font-size: 8px”>Hello world</h1>

	However i cannot add completely new attribute which browser does not know, like
	<h1 reply=“hello back!”>Hello world</h1>

	But this reply attribute is in browsers memory.
	Lets change reply attribute to ng-reply, so
	
	<h1 ng-reply=“hello back!”>Hello world</h1>

	So above ng-reply is my custom attribute. This is an important concept in angular js

3. Global Namespace

	if i create a variable: (app.js);
		var person = ‘Tony’;
		console.log(person);

	now this variable “person” is in global namespace and this is problem in practical life.

	lets suppose if i have another file with following code i.e. in utility.js
		var person = ‘Steve’
		function logPerson()
		{
			console.log(person);
		}

		and now call this logPerson function in the app.js, like:
		
		var person = ‘Tony’;
		logPerson();
		it will give output to Tony, though we want it to display Steve in reality. So there is lot of confusion if we put something in global namespace.

	
		now lets change utility.js to
		var stevesApp = {}
		stevesApp.person =  ‘Steve’;
		steves.logPerson = function()
		{
			console.log(stevesApp.person);
		}

		now lets call this function in app.js
		var person = ‘Tony’;
		stevesApp.logPerson();
		it will output as Steve.

	so this is major concept in angularjs

4. Modules, Apps and Controllers
	Lets create a file index.html and app.js

	only one variable is put inside global name space and rest all are not put in global namespace.

	open app.js, and write following:

	// MODULE
	var angularAppVar = angular.module('angularApp', []);

	now we have one object in global namespace  i.e. angularAppVar, it has name of app and array of dependencies

	now open index.html and change html tag to following:
	<html lang="en-us" ng-app="angularApp">

	This is how we tell the file that this is angularJS application and everything will be connected now to angularApp

	lets add controller in app.js
// CONTROLLERS
angularApp.controller('mainController', ['$scope', function ($scope) {
    
}]);

it has name and function,

	now this is controller to view, to connect html with js, add following code in html:
	<div ng-controller="mainController">
                
                hello world
                
            </div>


	now js and html are connected with controller mainController, and now any code inside controller function will affect html inside the ng-controller in html


5. Dependency Injection


6. Scope
	Binds controller with view

	create app.js

var myApp = angular.module('myApp', []);

myApp.controller('mainController', function($scope) {
    
    $scope.name = 'Jane Doe';
    $scope.occupation = 'Coder';
    
    $scope.getname = function() {
        return 'John Doe';
    }
    
    console.log($scope);
    
});

7. $log
	you can pass $log inside controller and can access $log.debug or $log.info etc, inside the controller.

8. $filter
	inject $filter in controller
	$scope.name = ‘John’;

	$scope.formattedname = $filter(‘uppercase’)($scope.name);
	$log.info($scope.name);
	$log.debug($scope.formattedname);

9. Using other modules like messages from file:
https://code.angularjs.org/1.4.4/angular-messages.js

10. Minification

11. Variable from controller to view
	





7. Custom Directives
    EXAMPLE
    Lets take one example with multiple search results
    <h1>Search Results</h1>
    <div>
        <h2>Title</h2>
        <p>Detail</p>
        <a href='#'>...more detail</a>
    </div>
    <div>
        <h2>Title</h2>
        <p>Detail</p>
        <a href='#'>...more detail</a>
    </div>
    <div>
        <h2>Title</h2>
        <p>Detail</p>
        <a href='#'>...more detail</a>
    </div>
    
    What if we write following and it renders it as above
    <searchResult></searchResult>
    or something like that
    
    
    NORMALIZE:
    To make consistent to a standard
    Specifically we are dealing with 'Text normalization' or making strings of text consistent to a standard.
    
    for example in html we write
    <search-result></search-result>
    and if define same thing in JS like:
    var search-result = 'hello world';
    this will give error
    
    so in angular we convert search-result from HTML to searchResult in JS and this is called Normalization.
    
    
    CREATING A DIRECTIVE
    Lets implement search result page using directive
    <label>Search</label>
    <input type="text" value="Doe" />
    
    <h3>Search Results</h3>
    <div class="list-group">
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">Doe, John</h4>
            <p class="list-group-item-text">
                555 Main St., New York, NY 11111
            </p>
        </a>
    </div>
    <div class="list-group">
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">Doe, John</h4>
            <p class="list-group-item-text">
                555 Main St., New York, NY 11111
            </p>
        </a>
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">Doe, John</h4>
            <p class="list-group-item-text">
                555 Main St., New York, NY 11111
            </p>
        </a>
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">Doe, John</h4>
            <p class="list-group-item-text">
                555 Main St., New York, NY 11111
            </p>
        </a>
    </div>
    
    angular.module('modulename')
        .directive("searchResult", function() {
            return {
                template: '<a href="#" class="list-group-item"><h4 class="list-group-item-heading">Doe, John</h4><p class="list-group-item-text">555 Main St., New York, NY 11111</p></a>',
            }// this object is my directive
    });
    
    Now changing above html to following
    <label>Search</label>
    <input type="text" value="Doe" />
    
    <h3>Search Results</h3>
    <div class="list-group">
        <search-result></search-result>
    </div>
    
    Now check the result in inspect element,
    you will notice the result is wrapped in
    <search-result>html</search-result>
    
    To avoid this we will add new property in directive:
        replace: true
    
    angular.module('modulename')
        .directive("searchResult", function() {
            return {
                template: '<a href="#" class="list-group-item"><h4 class="list-group-item-heading">Doe, John</h4><p class="list-group-item-text">555 Main St., New York, NY 11111</p></a>',
                replace: true
            }// this object is my directive
    });
    
    
    Now changing above html to following
    <label>Search</label>
    <input type="text" value="Doe" />
    
    <h3>Search Results</h3>
    <div class="list-group">
        <search-result></search-result>
        <search-result></search-result>
        <search-result></search-result>
        <search-result></search-result>
        <search-result></search-result>
    </div>
    
    We can use restrict to define where to show directive
    restrict: 'AECM'
    A - attribute   <div search-result></div>
    E - element <search-result></search-result>
    C - class name <div class="search-result"></div>
    M - comment  <!-- directive: search-result -->
    
    Note: AE are by default true
    
    angular.module('modulename')
        .directive("searchResult", function() {
            return {
                restrict: 'AE',
                template: '<a href="#" class="list-group-item"><h4 class="list-group-item-heading">Doe, John</h4><p class="list-group-item-text">555 Main St., New York, NY 11111</p></a>',
                replace: true
            }// this object is my directive
    });
    
    
    we can also use templateUrl
    
    angular.module('modulename')
        .directive("searchResult", function() {
            return {
                restrict: 'AE',
                templateUrl: 't.html',
                replace: true
            }// this object is my directive
    });
    
    t.html
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">Doe, John</h4>
            <p class="list-group-item-text">
                555 Main St., New York, NY 11111
            </p>
        </a>
        
     
    Scope with @
    angular.module('modulename')
        .directive("searchResult", function() {
        return {
            restrict: 'AE',
            templateUrl: 't.html',
            replace: true,
            scope: {}//isolating the scope
        }
    });
    
    Poking hole in directive
    Now changing above html to following
    <label>Search</label>
    <input type="text" value="Doe" />
    
    <h3>Search Results</h3>
    <div class="list-group">
        <search-result person-name="{{person.name}}"></search-result>
    </div>
    
    
    angular.module('modulename')
        .directive("searchResult", function() {
        return {
            restrict: 'AE',
            templateUrl: 't.html',
            replace: true,
            scope: {
                personName: "@",
            }
        }
    });
    
    or 
    
    angular.module('modulename')
        .directive("searchResult", function() {
        return {
            restrict: 'AE',
            templateUrl: 't.html',
            replace: true,
            scope: {
                personNameSpecial: "@personName"
            }
        }
    });
    
    directive t.html
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">{{personName}}</h4>
            <p class="list-group-item-text">
                555 Main St., New York, NY 11111
            </p>
        </a>
    
    Now changing above html to following
    <label>Search</label>
    <input type="text" value="Doe" />
    
    <h3>Search Results</h3>
    <div class="list-group">
        <search-result person-name="{{person.name}} person-address="{{person.address}}"></search-result>
    </div>
    angular.module('modulename')
        .directive("searchResult", function() {
        return {
            restrict: 'AE',
            templateUrl: 't.html',
            replace: true,
            scope: {
                personName: "@",
                personAddress: "@"
            }
        }
    });
    
    directive t.html
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">{{personName}}</h4>
            <p class="list-group-item-text">
                {{personAddress}}
            </p>
        </a>
        
    
    Scope with =
    Main.html
        
        <label>Search</label>
        <input type="text" value="Doe" />
        
        <h3>Search Results</h3>
        <div class="list-group">
            <search-result person-object="person"></search-result>
        </div>
     Main.js
        
        angular.module('modulename')
            .directive("searchResult", function() {
            return {
                restrict: 'AE',
                templateUrl: 't.html',
                replace: true,
                scope: {
                    personObject: "="
                }
            }
        });
    directive t.html
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">{{personObject.name}}</h4>
            <p class="list-group-item-text">
                {{personObject.address}}
            </p>
        </a>
    
    Scope with &
    $scope.formattedAddress = function(p) {
        return p.first + ' ' + p.last;
    };
    Main.html
        
        <label>Search</label>
        <input type="text" value="Doe" />
        
        <h3>Search Results</h3>
        <div class="list-group">
            <search-result person-object="{{person}}" formatted-address-function="formattedAddress(aperson)"></search-result>
        </div>
     Main.js
        
        angular.module('modulename')
            .directive("searchResult", function() {
            return {
                restrict: 'AE',
                templateUrl: 't.html',
                replace: true,
                scope: {
                    personObject: "=",
                    formattedAddressFunction: "&"
                }
            }
        });
    directive t.html
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">{{personObject.name}}</h4>
            <p class="list-group-item-text">
                {{formattedAddressFunction({aperson: personObject})}}
            </p>
        </a>
        
        
        Example
    $scope.people = [
        {
            name: 'John Doe',
            address: '555 new street',
            city: 'Fremont',
            state: 'CA'
        },
        {
            name: 'John Doe2',
            address: '555 new street',
            city: 'Fremont',
            state: 'CA'
        }
    ];
    Main.html
        
        <label>Search</label>
        <input type="text" value="Doe" />
        
        <h3>Search Results</h3>
        <div class="list-group" ng-repeat="person in people">
            <search-result person-object="{{person}}" formatted-address-function="formattedAddress(aperson)"></search-result>
        </div>
        
        or 
        
        <div class="list-group">
            <search-result person-object="{{person}}" formatted-address-function="formattedAddress(aperson)" ng-repeat="person in people"></search-result>
        </div>
        
        link: function(scope, element, attrs) {
            
        }