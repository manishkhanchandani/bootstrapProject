'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    var ref = new Firebase('https://victore07.firebaseio.com/firebase2');
		var myFirebaseArray = $firebaseArray(ref);
		$scope.myFirebaseArray = myFirebaseArray;
		$scope.addRec = {};
		$scope.editRec = {};
		$scope.message = null;
		$scope.addRecord = function() {
			console.log("added new record");
      myFirebaseArray.$add($scope.addRec).then(function(returnVar) {
				$scope.message = "record added successfully";
				$scope.addRec = {};
			});
		}
		$scope.editForm = function(data) {
			$scope.editRec.name = data.name;
			$scope.editRec.age = data.age;
			$scope.editRec.id = data.$id;
		};
		
		$scope.deleteForm = function(data) {
	    myFirebaseArray.$remove(data);
		};
		
		$scope.editRecord = function(data) {
			var record = myFirebaseArray.$getRecord($scope.editRec.id);
			record.age = $scope.editRec.age;
			record.name = $scope.editRec.name;
			myFirebaseArray.$save(record).then(function(returnVar) {
				$scope.editRec = {};
				$scope.message = "record updated successfully";
		})
	};
}]);
		
		