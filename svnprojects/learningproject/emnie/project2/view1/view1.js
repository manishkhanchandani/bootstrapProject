'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
  })
  .when('/about', {
    templateUrl: 'view1/about.html',
    controller: 'AboutCtrl'
  });
}])
.controller('View1Ctrl', [function() {
  console.log("view1");
}])
.controller('AboutCtrl', [function() {
  console.log("about");
}])
;