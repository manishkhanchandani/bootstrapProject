'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.users',
  'ngAutocomplete'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .otherwise({redirectTo: '/view1'});
}])

.controller('mainController', ['$scope', 'mkServices', '$location', '$window', function($scope, mkServices, $location, $window) {
    $scope.pageName = 'Dashboard';
	/*
	$scope.city = {};
    $scope.city.hostname = location.hostname;
    $scope.city.mainHost = (location.hostname).replace(/\.dcomerce\.com/g, '');
    $scope.city.mainHostUrl = btoa($scope.city.mainHost);
	if (!($scope.city.mainHost === 'dcomerce.com' || $scope.city.mainHost === '' || $scope.city.mainHost === 'www')) {
		mkServices.getLocationData($scope.city.mainHost, locationDataReturn);
	}
	
	function locationDataReturn(returnVar)
	{
		if (!returnVar) {
			$window.location.href = 'http://dcomerce.com';
			return false;	
		}
		console.log(returnVar);
		$scope.$apply(function() {
			$scope.location = returnVar;
		});
	}*/
	
	$scope.error = {};
	$scope.ref = mkServices.reference;
	$scope.userInfo = {};
	$scope.location = {};
	$scope.userLocations = [];
	// Create a callback which logs the current auth state
	function authDataCallback(authData) {
	  if (authData) {
		$scope.ref.child('users').child(authData.uid).once('value', function(returnVar) {
                $scope.$apply(function() {
                    $scope.userInfo = returnVar.val();
					$scope.userInfo.uid = authData.uid;
					console.log($scope.userInfo);
                });
            });
		
		$scope.ref.child('users').child(authData.uid).child('locations').on('value', function(returnVar) {
				$scope.userLocations = [];
				angular.forEach(returnVar.val(), function(value, key) {
					$scope.ref.child('locations').child(key).once('value', function(locVar) {
                		$scope.$apply(function() {
							$scope.userLocations.push(locVar.val());
							console.log($scope.userLocations);
                		});
					});
				});
					
            });
	  } else {
		console.log("User is logged out");
		$scope.userInfo = {};
	  }
	}
	// Register the callback to be fired every time auth state change
	$scope.ref.onAuth(authDataCallback);
}])

;
