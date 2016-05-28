'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$timeout', function($scope, $timeout) {
	var ref = new Firebase("https://victore07.firebaseio.com/messages");

	$scope.message = "";
	$scope.email = "";
	$scope.firstName = "";
	$scope.lastName = "";
	$scope.submitted = false;
	
	$scope.sendMessage = function() {
	  ref.push({
			email: $scope.email,
			message: $scope.message,
			firstName: $scope.firstName,
			lastName: $scope.lastName
		});
	  $scope.submitted = true;
		$timeout(function(){
       $scope.submitted = false;
    }, 8000);
	};
}]);