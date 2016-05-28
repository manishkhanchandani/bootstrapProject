(function() {
 
  'use strict';

	// Declare app level module which depends on views, and components
	angular.module('myApp', [
		'ngRoute',
		'myApp.login',
		'myApp.home',
		'myApp.products',
		'myApp.contact',
		'myApp.cart'
	])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/home'});
	}]);

})();