'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {
    var rootRef = new Firebase('https://mycontacts12.firebaseio.com/firebase1');
    var usersRef = rootRef.child('users');
    var user1Ref = usersRef.child('victor');
    user1Ref.set({
        name: 'Victor',
        age: 32,
        gender: 'male'    
    });
    var user2Ref = usersRef.child('chris');
    user2Ref.set({
        name: 'Chris',
        age: 40,
        gender: 'female'    
    });
    var user3Ref = usersRef.child('manish');
    user3Ref.set({
        name: 'Manish',
        age: 41,
        gender: 'male'    
    });
    var listingsRef = rootRef.child('listings');
    var p1 = listingsRef.push({
        'title': 'New home in san jose',
        'price': 400000,
        'beds': 4,
        'baths': 2,
        'sqft': 2000    
    });
    var postID1 = p1.key();
    console.log('postID1: ', postID1);
    var p2 = listingsRef.push({
        'title': 'Old home in san jose',
        'price': 500000,
        'beds': 5,
        'baths': 4,
        'sqft': 3000    
    });
    var postID2 = p2.key();
    console.log('postID2: ', postID2);
}]);