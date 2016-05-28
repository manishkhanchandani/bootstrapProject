'use strict';

angular.module('myApp.view1', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$firebaseArray',function($scope, $firebaseArray) {
    var rootRef = new Firebase('https://cguo.firebaseio.com/firebaseProject');
    //how to use firebaseArray, 
    var myFirebaseArray = $firebaseArray(rootRef);
    $scope.myFirebaseArray = myFirebaseArray;
    $scope.addRec = {};
    $scope.editRec = {};
    $scope.message = null;
    $scope.addRecord = function() {
        console.log('adding new record');
        console.log($scope.addRec);
        myFirebaseArray.$add($scope.addRec).then(function(returnVal) {
            console.log(returnVal.key());
            $scope.addRec = {};
            $scope.message = 'Record added successfully!';
        });
    };
    
    $scope.editForm = function(data){
        $scope.editRec.name = data.name;
        $scope.editRec.age = data.age;
        $scope.editRec.id = data.$id;
    };
    
    $scope.deleteForm = function(data){
        console.log(data);
        myFirebaseArray.$remove(data);
    };
    
    $scope.editRecord = function(){
        var record = myFirebaseArray.$getRecord($scope.editRec.id);
        record.name = $scope.editRec.name;
        record.age = $scope.editRec.age;
        myFirebaseArray.$save(record).then(function(returnVal){
            $scope.editRec = {};
            $scope.message = 'Record updated successfully!';
        });
     };

}]);