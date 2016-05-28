'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.main',
  'myApp.admin',
  'LocalStorageModule'
]).
config(['$routeProvider', 'localStorageServiceProvider', '$locationProvider', function($routeProvider, localStorageServiceProvider, $locationProvider) {
  $routeProvider
  .when('/logout', {
    templateUrl: 'main/login.html',
    controller: 'LoginCtrl'
  }).otherwise({redirectTo: '/home'});
  localStorageServiceProvider.setPrefix('mkMeetOnPrefix');
  // localStorageServiceProvider.setStorageCookieDomain('example.com');
  // localStorageServiceProvider.setStorageType('sessionStorage');
  //https://github.com/grevory/angular-local-storage/
}])
.controller('myIndexCtrl', ['$scope', 'mkServices', 'localStorageService', '$location', function($scope, mkServices, localStorageService, $location) {
    var mainRef = mkServices.reference;
    $scope.mainRef = mainRef;
    
    var authData = mainRef.getAuth();
    //console.log('authdata: ', authData);
    if (!authData) {
        mkServices.clearCurrentUser();
        $scope.userData = {};
        $scope.isLoggedIn = false;
    } else {
        $scope.userData = mkServices.currentUser();
        $scope.isLoggedIn = true;
    }
    //console.log($scope.isLoggedIn);
    $scope.goto = function(path) {
        console.log(path);
        //$location.path(path);  
    };
    $scope.googleLogout = function() {
        mainRef.unauth();
        mkServices.clearCurrentUser();
        $scope.isLoggedIn = false;
        $scope.userData = null;
        $location.path('/login');
    };//end google logout
    $scope.googleLogin = function() {
          mainRef.authWithOAuthPopup("google", function(error, authData) {
              $scope.$apply(function () {
                  if (error) {
                    console.log("Login Failed!", error);
                  } else {
                    console.log("Authenticated successfully with payload:", authData);
                    var refUsers = mainRef.child('users');
                    var refUserId = refUsers.child(authData.google.id);
                    $scope.isLoggedIn = true;
                    //console.log($scope.isLoggedIn);
                    $scope.userData = {'id': authData.google.id, 'name': authData.google.displayName, 'img': authData.google.profileImageURL, 'provider': authData.provider, 'gender': authData.google.cachedUserProfile.gender, 'link': authData.google.cachedUserProfile.link};
                    refUserId.set($scope.userData);
                    localStorageService.set('userData', $scope.userData);
                    //console.log($scope.userData);
                  }
              });
        }, {
		  remember: "sessionOnly",
		  scope: "email"
		});
    };//end googlelogin
}])
;
