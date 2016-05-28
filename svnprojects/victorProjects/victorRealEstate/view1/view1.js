'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/listings', {
    templateUrl: 'view1/listings.html',
    controller: 'ListingsCtrl'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/listings/:id', {
    templateUrl: 'view1/details.html',
    controller: 'DetailsCtrl'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/agents', {
    templateUrl: 'view1/agents.html',
    controller: 'AgentsCtrl'
  });
}])

.controller('View1Ctrl', [function() {

}])

.controller('AgentsCtrl', [function() {

}])

.controller('ListingsCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('json/properties.json').then(function(response) {
		$scope.properties = response.data;
		console.log(response);
  });
}])

.controller('DetailsCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
  var listingId = $routeParams.id;
  $http.get('json/properties.json').then(function(response) {
	console.log(response.data);
	console.log(listingId);
	var propertyDetail = $filter('filter')(response.data, function(filt) {
	  return filt.id == listingId;
  });
	console.log(propertyDetail[0]);
	console.log(propertyDetail[0].images[0].name);
	$scope.details = propertyDetail;
	$scope.mainImage = propertyDetail[0].images[0].name;
  });
  $scope.setImg = function(a) {
    $scope.mainImage = a.name;
  };
}]);
