'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl'
  });
}])

.controller('View4Ctrl', [function() {
    //1. Creating user objects and tying them to auth objects
    //2. Retrieving user objects upon authentication
    //3. Responding to the session change events
    
    var ref = new Firebase('https://mycontacts12.firebaseio.com/livelinks');
    
    ref.unauth();//to logout user
    
    var currentUser = {};
    ref.createUser({
          email    : "user5@mkgalaxy.com",
          password : "password"
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log(userData);
            console.log("Successfully created user account with uid:", userData.uid);
            var refUsers = ref.child('users');
            var refUser = refUsers.child(userData.uid);
            refUser.on('value', function(snapshot) {
                currentUser = snapshot.val();
                console.log("current user changed to");
                console.log(currentUser);
                console.log(snapshot.val());
            });
          }
        });
    
    
    ref.onAuth(function(authResponse) {
       if (authResponse) {
            console.log('user is logged in', authResponse);   
       } else {
            console.log('user is logged out');
       }
    });
    
    ref.authWithPassword({
          email    : "user2@mkgalaxy.com",
          password : "password"
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
    
    var auth = ref.getAuth();
    console.log(auth);
    
}]);