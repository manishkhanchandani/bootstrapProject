'use strict';

angular.module('myApp.students', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/students', {
    templateUrl: 'students/students.html',
    controller: 'StudentsCtrl'
  });
}])

.controller('StudentsCtrl', [function() {

}]);