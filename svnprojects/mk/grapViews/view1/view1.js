'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/add', {
    templateUrl: 'view1/add.html',
    controller: 'AddCtrl'
  })
  ;
}])

.controller('View1Ctrl', ['$scope', function($scope) {

}])

.controller('AddCtrl', ['$scope', function($scope) {
  $scope.data = {};
  $scope.addForm = function() {
    if (!$scope.data.keywords) {
      $scope.data.error = 'Missing keywords';
      return;
    }
    if (!$scope.data.keywords) {
      $scope.data.error = 'Missing keywords';
      return;
    }
  };
  
  
}])

;