'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'firebase'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('homeApp', ['$scope','$firebaseAuth','$location', function($scope,$firebaseAuth,$location) {
    $scope.register = {};

    $scope.registerForm = function() {
      var ref = new Firebase("https://victore07.firebaseio.com/");
      $scope.auth = $firebaseAuth(ref);
      $scope.auth.$createUser({
        email: $scope.register.email,
        password: $scope.register.password
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    };

    $scope.loginForm = function() {
      var ref = new Firebase("https://victore07.firebaseio.com/");
      $scope.auth = $firebaseAuth(ref);
      $scope.auth.$authWithPassword({
        email: $scope.register.email,
        password: $scope.register.password
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $location.path('/agents')
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    };

}]);
