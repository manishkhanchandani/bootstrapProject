'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
  var ref = new Firebase("https://victorpano.firebaseio.com");
  $scope.data = $firebaseObject(ref);
}]);