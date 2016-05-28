'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/location/change', {
    templateUrl: 'view1/location.html',
    controller: 'LocationCtrl'
  }).when('/location/change', {
    templateUrl: 'view1/location.html',
    controller: 'LocationCtrl'
  }).when('/loc/:url', {
    templateUrl: 'view1/loc.html',
    controller: 'LocCtrl'
  })
  
  ;
}])

.controller('View1Ctrl', ['$scope', '$location', function($scope, $location) {
    $scope.$parent.pageName = 'Dashboard';
}])
.controller('LocCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
    $scope.$parent.pageName = 'Location';
	$scope.ref.child('locations').child(btoa($routeParams.url)).once('value', function(returnVar) {
		$scope.$apply(function() {
			var a = returnVar.hasChildren();
			if (!a) {
				$location.path('/location/change');
				return false;	
			}
			$scope.$parent.location = returnVar.val();
		});
	});
}])
.controller('LocationCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.$parent.pageName = 'Find Location';
	//maps options
	$scope.details = {};
	$scope.mapOptions = {
      types: '(cities)'
    };
	$scope.getDetails = function() {
		if (typeof($scope.details.components) === 'undefined' || !$scope.details.components) {
			return false;
		}
		var city = $scope.details.components.city.toLowerCase();
		var state = $scope.details.components.state.toLowerCase();
		var country = $scope.details.components.country.toLowerCase();
  		city = city.replace(/ /g, '_');
  		state = state.replace(/ /g, '_');
  		country = country.replace(/ /g, '_');
  		var url = country + "-" + state + "-" + city;
		$scope.details.components.url = url;
		$scope.details.components.place_id = $scope.details.place_id;
		$scope.ref.child('locations').child(btoa(url)).update($scope.details.components);
		console.log($scope.details);
		return url;
	};
	
	$scope.addToMyCity = function() {
		var url = $scope.getDetails();
		if (!url) {
			return false;	
		}
		$scope.ref.child('users').child($scope.userInfo.uid).child('locations').child(btoa(url)).set(true);
		$scope.error.location = 'Location Added Successfully';
	};
	
	$scope.changeCity = function() {
		var url = $scope.getDetails();
		if (!url) {
			return false;	
		}
		$location.path('/loc/'+url);
	};
}]);
