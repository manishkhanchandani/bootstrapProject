'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [function() {
    //1. Exploring the authentication section of the Firebase Dashboard and trying auth out in the debugger console
    
    //2. Creating user objects and tying them to auth objects
    //3. Adding user accounts and authentication logic to our livelinks application
        var ref = new Firebase('https://mycontacts12.firebaseio.com/livelinks');
        ref.createUser({
          email    : "bobtony3@firebase.com",
          password : "correcthorsebatterystaple"
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
          }
        });
        
        ref.authWithPassword({
          email    : "bobtony@firebase.com",
          password : "correcthorsebatterystaple"
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
        
        ref.changeEmail({
          oldEmail : "bobtony3@firebase.com",
          newEmail : "bobtony211@firebase.com",
          password : "correcthorsebatterystaple"
        }, function(error) {
          if (error === null) {
            console.log("Email changed successfully");
          } else {
            console.log("Error changing email:", error);
          }
        });
        
        ref.changePassword({
          email       : "bobtony@firebase.com",
          oldPassword : "correcthorsebatterystaple",
          newPassword : "neatsupersecurenewpassword"
        }, function(error) {
          if (error === null) {
            console.log("Password changed successfully");
          } else {
            console.log("Error changing password:", error);
          }
        });
        
        ref.resetPassword({
          email : "bobtony@firebase.com"
        }, function(error) {
          if (error === null) {
            console.log("Password reset email sent successfully");
          } else {
            console.log("Error sending password reset email:", error);
          }
        });
        
        
        ref.removeUser({
          email    : "bobtony@firebase.com",
          password : "correcthorsebatterystaple"
        }, function(error) {
          if (error === null) {
            console.log("User removed successfully");
          } else {
            console.log("Error removing user:", error);
          }
        });
    
}]);