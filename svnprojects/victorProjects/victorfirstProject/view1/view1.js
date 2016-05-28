'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.directive('dirH1', function() {
  return {
    templateUrl: "view1/dirH1.html",
	scope: {
	},
	link: function(scope, elem, attrs) {
	  scope.dosomething = function() {
		console.log('I pressed the first button');
	  };
	  scope.dosomething2 = function() {
		console.log('I pressed the second button');
	  };
	  scope.dosomething3 = function() {
		console.log('I pressed the third button');
	  };
	  scope.dosomething4 = function() {
		console.log('I pressed the fourth button');
	  };
	}
  };
})

.directive('dirH2', function() {
  return {
    templateUrl: "view1/dirH2.html",
	scope: {
	},
	link: function(scope, elem, attrs) {
	  console.log('This is directive h2');
	}
  };
})

.directive('dirH3', function() {
  return {
    templateUrl: "view1/dirH3.html",
	scope: {
	},
	link: function(scope, elem, attrs) {
	  console.log('This is directive h3');
	}
  };
})

.directive('dirH4', function() {
  return {
    templateUrl: "view1/dirH4.html",
	scope: {
	},
	link: function(scope, elem, attrs) {
	  console.log('This is directive h4');
	}
  };
})

.directive('dirH5', function() {
  return {
    templateUrl: "view1/dirH5.html",
	scope: {
	},
	link: function(scope, elem, attrs) {
	  console.log('This is directive h5');
	}
  };
})

.directive('dirH6', function() {
  return {
    templateUrl: "view1/dirH6.html",
	scope: {
	},
	link: function(scope, elem, attrs) {
	  console.log('This is directive h6');
	}
  };
})

.controller('View1Ctrl', [function() {

}]);