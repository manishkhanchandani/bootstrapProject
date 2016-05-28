angular.module("myApp", [
    'ngRoute',
	'myApp.view1',
	'ngAutocomplete'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
  //$locationProvider.hashPrefix('!');
}])
.controller('mainController', ['$scope', '$location', function($scope, $location) {

	$scope.ipDetails.result = {"1122", "3344"};
  /*function getIpDetails(res) {
    $scope.ipDetails = res.data;
    console.log('ipdetails: ', $scope.ipDetails);
  }

  mkServices.ip(getIpDetails);*/
}])
;