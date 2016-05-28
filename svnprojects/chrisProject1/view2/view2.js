'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {
    var ref = new Firebase('https://cguo.firebaseio.com/glogin');
    $scope.glogin = function() {
        ref.authWithOAuthPopup("google", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else if (authData) {
                // user authenticated with Firebase
                console.log("Authenticated successfully with payload:", authData);
            }
        });
    }
}]);