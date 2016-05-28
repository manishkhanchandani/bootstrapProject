'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/view2', {
    templateUrl: 'view1/view2.html',
    controller: 'View1Ctrl'
  }).when('/tutorCreation', {
    templateUrl: 'view1/tutorCreation.html',
    controller: 'TutorCreationCtrl'
  }).when('/studentCreation', {
    templateUrl: 'view1/studentCreation.html',
    controller: 'StudentCreationCtrl'
  })
  .when('/tutorSearch', {
    templateUrl: 'view1/tutorSearch.html',
    controller: 'TutorSearchCtrl'
  })
  ;
}])

.controller('View1Ctrl', ['$scope', function($scope) {

}])

.controller('TutorCreationCtrl', ['$scope', function($scope) {
  
  

}])
.controller('TutorSearchCtrl', ['$scope', function($scope) {
  
  

}])
.controller('StudentCreationCtrl', ['$scope', function($scope) {
  
  

}])
;