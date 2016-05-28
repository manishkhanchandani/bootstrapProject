'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','$firebaseObject','$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
		
  var ref = new Firebase("https://victore07.firebaseio.com/messages");
	ref.on('child_added', function() {
		$scope.myData = $firebaseArray(ref);
		console.log($firebaseArray(ref));
  });
	 
}]);