'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
}])


.controller('mainCtrl', ['$scope', '$location', function($scope, $location) {
  
  $scope.links = {
    home: '',
    about: '',
    services: '',
    contact: ''
  };

  $scope.updateLinks = function (path) {
    
    $scope.links = {
      home: '',
      about: '',
      services: '',
      contact: ''
    };
    $scope.links[path] = 'active';
  };

  

}])
;
