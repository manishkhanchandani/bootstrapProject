'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [function() {
    var rootRef = new Firebase('https://mycontacts12.firebaseio.com/firebase1');
    /*
    rootRef.createUser({
      email    : "victore1@mk.com",
      password : "password"
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        var usersRef = rootRef.child('emailUsers');
        var userDataRef = usersRef.child(userData.uid);
        userDataRef.set({uid: userData.uid, email: "victore1@mk.com", gender: 'male', age: 33});
      }
    });
    rootRef.createUser({
      email    : "chris@mk.com",
      password : "password"
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
    rootRef.authWithPassword({
      email    : "victore@mk.com",
      password : "password"
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });*/
    //to log out
    rootRef.unauth();
    //to get logged in users data
    var authData = rootRef.getAuth();
    console.log(authData);
}]);