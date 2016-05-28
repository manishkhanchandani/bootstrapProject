'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
    $scope.isLoggedIn = false;
    $scope.name = '';
    $scope.userData = {};
    $scope.newMessage = {};
    var ref = new Firebase('https://mycontacts12.firebaseio.com/web/chat');
    $scope.ref = ref;
    
    // download the data into a local object
    var messageRef = $scope.ref.child("messages");
    var syncObject = $firebaseObject(messageRef);
    // three way data binding
    syncObject.$bindTo($scope, 'data');
    
    $scope.handleKeyup = function(e) {
        if (e.keyCode == 13) {
            console.log($scope.userData.google.displayName);
            $scope.newMessage.author = $scope.userData.google.displayName;
            console.log($scope.newMessage.author);
            console.log($scope.newMessage);
            messageRef.push($scope.newMessage);
            $scope.newMessage = {};
        }
    };
    $scope.googleLogin = function() {
        $scope.ref.authWithOAuthPopup("google", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            $scope.$apply(function () {
                $scope.isLoggedIn = true;
                $scope.name = authData.google.displayName;
                $scope.userData = authData;
                console.log($scope);
            });
          }
        });
    };
}]);