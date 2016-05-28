'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngMap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    
}]);