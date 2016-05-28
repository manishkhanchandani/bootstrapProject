(function() {

	'use strict';

	angular.module('myApp.view1', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/view1', {
			templateUrl: 'view1/view1.html',
			controller: 'View1Ctrl'
		});
	}])

	.factory('myFactory', [function() {
		var factory = {};
		var factoryCustomers = ['factory1', 'factory2'];
		factory.getCustomers = function() {
			return factoryCustomers;
		};
		return factory;
	}])

	.service('myService', function() {
		var serviceCustomers = ['service1','service2'];
		this.getCustomers = function() {
			return serviceCustomers;
		};
	})

	.controller('View1Ctrl', ['myFactory','myService','$scope', function(myFactory, myService, $scope) {
		$scope.factoryCustomers = myFactory.getCustomers();
		$scope.serviceCustomers = myService.getCustomers();
		$scope.tojson = angular.fromJson(["name","hello"]);
	}]);
	
})();