(function() {

	'use strict';

	var app = angular.module('myApp.products', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/products', {
			templateUrl: 'products/products.html',
			controller: 'ProductsCtrl'
		})
		.when('/products/:id', {
			templateUrl: 'products/details.html',
			controller: 'DetailsCtrl'
		});
	}]);

	app.controller('ProductsCtrl', ['$scope', '$http', function($scope, $http) {
		$http.get('json/products.json')
			.then(function successCallback(response) {
				$scope.allProducts = response.data;
			});
	}]);

	app.controller('DetailsCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
		var productId = $routeParams.id;
		$http.get('json/products.json')
			.then(function successCallback(response) {
				for (var i = 0; i < response.data.length; i++) {
					if (response.data[i].bestSellingRank == productId) {
						$scope.productDetails = response.data[i];
					}
				}
			});	
	}]);

	app.filter('lessThan', function(){
		return function(ar, maxPrice){
			return ar.filter(function(e){
				return e.salePrice <= maxPrice;
			});
		};
	});
	
})();