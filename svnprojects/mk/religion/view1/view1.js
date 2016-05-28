'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/view2', {
    templateUrl: 'view1/view2.html',
    controller: 'View1Ctrl'
  }).when('/newReligion', {
    templateUrl: 'view1/newReligion.html',
    controller: 'NewReligionCtrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

}])

.controller('NewReligionCtrl', ['$scope', function($scope) {

}])
;