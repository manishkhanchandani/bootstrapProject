(function() {

	'use strict';

	var app = angular.module('myApp.home', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'home/home.html',
			controller: 'HomeCtrl'
		});
	}]);

	app.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
		$http.get('json/products.json')
		.then(function successCallback(response) {
			$scope.allProducts = response.data;
		});
	}]);
	
})();