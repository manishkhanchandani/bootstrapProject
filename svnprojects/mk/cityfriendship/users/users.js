'use strict';

angular.module('myApp.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: 'users/users.html',
    controller: 'UsersCtrl'
  }).when('/users/login', {
    templateUrl: 'users/login.html',
    controller: 'UsersLoginCtrl'
  }).when('/users/register', {
    templateUrl: 'users/register.html',
    controller: 'UsersRegisterCtrl'
  }).when('/users/forgot', {
    templateUrl: 'users/forgot.html',
    controller: 'UsersForgotCtrl'
  }).when('/users/logout', {
    templateUrl: 'users/login.html',
    controller: 'UsersLogoutCtrl'
  });
}])

.controller('UsersCtrl', [function() {

}])
.controller('UsersLogoutCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.logout = function() {
		$scope.ref.unauth();	
	}
	$scope.logout();	
	$location.path('/users/login');
}])
.controller('UsersRegisterCtrl', ['$scope', function($scope) {
    $scope.$parent.pageName = 'Register';
	$scope.data = {};
    $('.datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
      showWeek: true,
      firstDay: 1,
      dateFormat: "yy-mm-dd"
    });

    $scope.registerForm = function () {
		$scope.error.register = '';
		if ($scope.data.register.password != $scope.data.register.cpassword && $scope.data.register.password) {
			$scope.error.register = 'Password not matched with confirm password';
			return false;
		}
		$scope.data.register.dob = $('#date01').val();
		$scope.ref.createUser({
		  email    : $scope.data.register.email,
		  password : $scope.data.register.password
		}, function(error, userData) {
		  if (error) {
			  $scope.$apply(function () {
				$scope.error.register = error.code;
			  });
		  } else {
			  $scope.$apply(function () {
				$scope.error.register = 'Successfully Registered. Please go to login page...';
				var user = {
					uid: userData.uid,
					email: $scope.data.register.email,
					display_name: $scope.data.register.display_name,
					gender: $scope.data.register.gender,
					real_name: $scope.data.register.real_name,
					securityRecoveryKey: btoa($scope.data.register.password),
					dob: $scope.data.register.dob
				};
				$scope.ref.child('users').child(userData.uid).set(user);
				$scope.data.register = {};
			  });
		  }
		});
    };
}])
.controller('UsersLoginCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.$parent.pageName = 'Login';
	// Create a callback to handle the result of the authentication
	function authHandler(error, authData) {
		if (error) {
			$scope.$apply(function () {
			  $scope.error.login = error.code;
			});
		} else {
			$scope.$apply(function () {
				$scope.data.login = {};
			});
			$location.path('/');
		}
	}
    $scope.data = {};
    $scope.data.login = {};
    $scope.loginForm = function () {
		$scope.ref.authWithPassword({
		  email    : $scope.data.login.email,
		  password : $scope.data.login.password
		}, authHandler); 
    };

}])
.controller('UsersForgotCtrl', [function() {

}]);