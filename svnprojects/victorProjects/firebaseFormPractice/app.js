'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
	'myApp.home',
	'firebase'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])

.controller('UserAuth', ['$scope', function($scope) {
	$scope.email = "";
	$scope.password = "";
	$scope.authed = 0;
	
	var ref = new Firebase("https://victore07.firebaseio.com");
	
	$scope.login = function() {
		ref.authWithPassword({
			email : $scope.email,
			password : $scope.password
		}, function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully with payload:", authData);
				$scope.email = "";
				$scope.password = "";
				if (authData.uid) {
					$scope.authed = 1;
				}
	    }
		});
	};
	
	$scope.logout = function() {
		ref.unauth();
		$scope.authed = 0;
	};
		
}]);
