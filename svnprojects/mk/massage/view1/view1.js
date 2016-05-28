'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/create', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/browse', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  
  ;
}])

.controller('View1Ctrl', [function() {

}]);