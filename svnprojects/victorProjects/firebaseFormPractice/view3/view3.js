'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope', function($scope) {
	
	$scope.username = "";
	$scope.emailSignup = "";
	$scope.password1 = "";
	$scope.password2 = "";
	
	$scope.signup = function() {
	  var ref = new Firebase("https://victore07.firebaseio.com/messages");
		ref.createUser({
			email    : $scope.emailSignup,
			password : $scope.password1
		}, function(error, userData) {
			if (error) {
				console.log("Error creating user:", error);
			} else {
				console.log("Successfully created user account with uid:", userData.uid);
			}
		});
	};

}]);