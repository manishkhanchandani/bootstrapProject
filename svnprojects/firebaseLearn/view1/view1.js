'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
    var ref = new Firebase('https://mycontacts12.firebaseio.com/items');
    $scope.items = ref;
    // three way data binding
    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo($scope, 'data');
    
    $scope.sample = $firebaseArray(ref);
    $scope.sample.$add({foo: "bar"});
    ref.push({bar: "baz"});
}]);