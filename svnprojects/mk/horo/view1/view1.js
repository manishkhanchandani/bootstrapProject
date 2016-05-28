'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/install', {
    templateUrl: 'view1/install.html',
    controller: 'InstallCtrl'
  });
}])

.controller('View1Ctrl', [function() {

}])

.controller('InstallCtrl', ['$scope', function($scope) {
	//install Points
	$scope.ref.child('getPoints').child('n01').child('n01').set(28);
}])
;