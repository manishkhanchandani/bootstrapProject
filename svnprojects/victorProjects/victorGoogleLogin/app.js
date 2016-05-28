(function() {
  
  'use strict';

  var app = angular.module('myApp', []);

  app.controller('MainCtrl', ['$scope', function($scope) {
    function authDataCallback(authData) {
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } else {
        console.log("User is logged out");
      }
    }
    var ref = new Firebase("https://victore07.firebaseio.com/googLogin");
    ref.onAuth(authDataCallback);
    $scope.googleLogin = function() {
      ref.authWithOAuthPopup("google", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else if (authData) {
          console.log("Authenticated successfully with payload:", authData);
          $scope.$apply(function() {
            $scope.userData = authData;
          });
        }
      });
    };
    $scope.googleLogout = function() {
      ref.unauth();
      $scope.userData = null;
    };
  }]);
  
})();