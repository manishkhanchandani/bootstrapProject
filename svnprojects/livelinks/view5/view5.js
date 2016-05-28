'use strict';

angular.module('myApp.view5', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view5', {
    templateUrl: 'view5/view5.html',
    controller: 'View5Ctrl'
  });
}])

.controller('View5Ctrl', ['$scope', function($scope) {
    //1. Adding login and signup forms to livelinks
    //2. Wiring up the login and signup forms to function with Firebase and retrieve and create user accounts respectively
    //3. Adding logout functionality and demonstrating the entire authentication workflow
    
    var ref = new Firebase('https://mycontacts12.firebaseio.com/livelinks');
    
    $scope.isloginPage = false;
    $scope.login = function() {
        $scope.isloginPage = true;
        $scope.isSignPage = false;
    }
    $scope.isSignPage = false;
    $scope.signup = function() {
        $scope.isloginPage = false;
        $scope.isSignPage = true;
    }
    
    var authData = ref.getAuth();
    if (authData) {
      console.log("Get Auth, Authenticated user with uid:", authData);
    }

    $scope.logIn = {};
    $scope.signUp = {};
    $scope.loginForm = function() {
        console.log($scope.logIn);
        if (!$scope.logIn.email) {
            console.log('invalid email');
            return false;   
        }
        if (!$scope.logIn.password) {
            console.log('invalid password');
            return false;   
        }
        ref.authWithPassword({
          email    : $scope.logIn.email,
          password : $scope.logIn.password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
    };
    $scope.signupForm = function() {
        console.log($scope.signUp);
        if (!$scope.signUp.username) {
            console.log('invalid username');
            return false;   
        }
        if (!$scope.signUp.email) {
            console.log('invalid email');
            return false;   
        }
        if (!$scope.signUp.password) {
            console.log('invalid password');
            return false;   
        }
        if (!$scope.signUp.cpassword) {
            console.log('invalid confirm password');
            return false;   
        }
        if ($scope.signUp.cpassword !== $scope.signUp.password) {
            console.log('password and confirm password does not match');
            return false;   
        }
        
        ref.createUser({
          email    : $scope.signUp.email,
          password : $scope.signUp.password
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log(userData);
            console.log("Successfully created user account with uid:", userData.uid);
            var refUsers = ref.child('users');
            var refUser = refUsers.child(userData.uid);
            refUser.set({alias: $scope.signUp.username, email: $scope.signUp.email});
            $scope.logIn.email = $scope.signUp.email;
            $scope.logIn.password = $scope.signUp.password;
            $scope.loginForm();
          }
        });
    
    };
    
    ref.onAuth(function(authResponse) {
       if (authResponse) {
            console.log('user is logged in', authResponse);   
       } else {
            console.log('user is logged out');
       }
    });
}]);