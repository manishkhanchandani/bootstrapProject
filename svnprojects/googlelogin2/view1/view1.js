'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
    $scope.isLoggedIn = false;
    $scope.name = '';
    $scope.userData = {};
    var ref = new Firebase('https://mycontacts12.firebaseio.com/web/chat');
    $scope.ref = ref;
    
    
    $scope.googleLogin = function() {
        $scope.ref.authWithOAuthPopup("google", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            $scope.$apply(function () {
                $scope.isLoggedIn = true;
                $scope.name = authData.google.displayName;
                console.log($scope.name);
                $scope.userData = authData;
                console.log($scope.userData);
            });
          }
        });
    };
}]);