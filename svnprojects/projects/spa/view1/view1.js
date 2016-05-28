'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/about', {
    templateUrl: 'view1/about.html',
    controller: 'AboutCtrl'
  }).when('/services', {
    templateUrl: 'view1/services.html',
    controller: 'ServicesCtrl'
  }).when('/contact', {
    templateUrl: 'view1/contact.html',
    controller: 'ContactCtrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.updateLinks('home');
}])
.controller('AboutCtrl', ['$scope', function($scope) {
  $scope.updateLinks('about');
}])
.controller('ServicesCtrl', ['$scope', function($scope) {
  $scope.updateLinks('services');
}])
.controller('ContactCtrl', ['$scope', function($scope) {
  $scope.updateLinks('contact');
}]);