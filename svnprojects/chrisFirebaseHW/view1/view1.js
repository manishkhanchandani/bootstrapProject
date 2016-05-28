'use strict';

angular.module('myApp.view1', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','firebaseArray', function($scope, $firebaseArray) {
    var ref = new Firebase('https://cguo.firebase.com/chrisFirebaseHW');
    var myFirebaseArray = $firebaseArray(ref);
    $scope.myFirebaseArray = myFirebaseArray;
    $scope.addRec = {};
    $scope.addRec = Function(){
        console.log($scope.addRec);
        myFirebaseArray.$add($scope.addRec).then(function(returnVal) {
            $scope.addRec = {};
        });
    };
}]);