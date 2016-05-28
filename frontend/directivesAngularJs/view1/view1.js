'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
    $scope.person = {
            name: "John Doe",
            age: "25",
            city: "San Jose",
            street: "255 Willow St",
            state: "CA",
            zip: "95123"
        };
     $scope.formattedaddr = function(p) {
         return 'My New address is:  ' + p.street + ', ' + p.city + ', ' + p.state + ', ' + p.zip;
     }
}]);