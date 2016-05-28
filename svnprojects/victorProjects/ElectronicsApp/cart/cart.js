'use strict';

angular.module('myApp.cart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cart', {
    templateUrl: 'cart/cart.html',
    controller: 'CartCtrl'
  });
}])

.controller('CartCtrl', ['$scope','$http', function($scope, $http) {
	$http.get('json/products.json')
		.then(function successCallback(response) {
			$scope.allProducts = response.data;
		});
	console.log($scope.allProducts);
}]);