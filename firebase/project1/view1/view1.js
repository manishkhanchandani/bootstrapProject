'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
    var ref = new Firebase('https://mycontacts12.firebaseio.com/web/project1');
    $scope.ref = ref;
    $scope.googleLogin = function() {
        $scope.ref.authWithOAuthPopup("google", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
    };

    var usersRef = ref.child('users');
    usersRef.set({
        mkhancha: {dob: '1974-6-5', full_name: 'Manish Khanchandani'},
        nikhil: {dob: '2000-4-7', full_name: 'Nikhil Khanchandani'},
        nihar: {dob: '2015-8-22', full_name: 'Nihar Khanchandani'}, 
    });
    usersRef.child("mkhancha").set({
      date_of_birth: "1974-6-5",
      full_name: "Naveens Khanchandani"
    });
    var hopperRef = usersRef.child("mkhancha");
    hopperRef.update({
      "full_name": "Manish Khanchandani"
    });
    var postsRef = ref.child("posts");
    var newPostRef = postsRef.push();
    var postID = newPostRef.key();
    console.log('post id: ' + postID);
    newPostRef.set({
        author: "gracehop",
        title: "Announcing COBOL, a New Programming Language"
    });
    // we can also chain the two calls together
    postsRef.push().set({
        author: "alanisawesome",
        title: "The Turing Machine"
    });
    
    console.log('reading data');
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    var ref2 = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
ref2.orderByKey().on("child_added", function(snapshot) {
  console.log(snapshot.key());
});
    var scoresRef = new Firebase("https://dinosaur-facts.firebaseio.com/scores");
scoresRef.orderByValue().on("value", function(snapshot) {
  snapshot.forEach(function(data) {
    console.log("The " + data.key() + " dinosaur's score is " + data.val());
  });
});

// see if Mary is in the 'alpha' group
var ref = new Firebase("https://docs-examples.firebaseio.com/web/org/users/mchen/groups/alpha");
ref.once('value', function(snap) {
  var result = snap.val() === null? 'is not' : 'is';
  console.log('Mary ' + result + ' a member of alpha group');
});

}]);