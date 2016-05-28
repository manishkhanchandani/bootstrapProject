(function() {

	'use strict';

	var app = angular.module('myApp.contact', ['ngRoute']);

	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/contact', {
			templateUrl: 'contact/contact.html',
			controller: 'ContactCtrl'
		});
	}]);

	app.controller('ContactCtrl', ['$scope', '$timeout', function($scope, $timeout) {
		var ref = new Firebase("https://victore09.firebaseio.com/messages");
		var zapRef = new Firebase("https://victore09.firebaseio.com/out");
		$scope.message = "";
		$scope.email = "";
		$scope.fullName = "";
		$scope.submitted = false;
		$scope.sendMessage = function() {
			ref.push({
				email: $scope.email,
				message: $scope.message,
				fullName: $scope.fullName
			});
			zapRef.push({
				email: $scope.email,
				message: $scope.message,
				fullName: $scope.fullName
			});
			$scope.submitted = true;
			$timeout(function(){
				 $scope.submitted = false;
			}, 8000);
		};
	}]);

})();