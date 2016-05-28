'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/birthProfile', {
    templateUrl: 'view1/horo/location.html',
    controller: 'LocationPostCtrl'
  });
}])

.filter('object2Array', function() {
  return function(input) {
    var out = []; 
    for(var i in input){
      out.push(input[i]);
    }
    return out;
  }
})

.controller('View1Ctrl', ['$scope', function($scope) {

}])

.controller('LocationPostCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  
  
  //initializing
  $scope.data = {};
  $scope.data.error = {};
  
  if ($routeParams.action) {
    $scope.data.step = $routeParams.action;
  }
  
  //autocomplete
  $scope.details = {};
	$scope.mapOptions = {
      types: 'geocode' //types: '(cities)'
    };
  //autocomplete
  
  //time
  $scope.mytime = new Date();
  $scope.ismeridian = true;

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.data.birthhour = $scope.mytime.getHours();
  $scope.data.birthminute = $scope.mytime.getMinutes();
  


}]);