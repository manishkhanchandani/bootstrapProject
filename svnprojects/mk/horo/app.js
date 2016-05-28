'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.controller('MainController', ['$scope', function($scope) {
	$scope.ref = new Firebase('https://mycontacts12.firebaseio.com/horo');
}])
;
