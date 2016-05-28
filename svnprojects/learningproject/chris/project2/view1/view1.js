'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
  $routeProvider.when('/about', {
    templateUrl: 'view1/about.html',
    controller: 'AboutCtrl'
  });
}])

.controller('View1Ctrl', [function() {

}])
.controller('AboutCtrl', [function() {

}]);