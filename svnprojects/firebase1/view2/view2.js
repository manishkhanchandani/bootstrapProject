'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {
    var rootRef = new Firebase('https://mycontacts12.firebaseio.com/firebase1/listings');
    /*rootRef.on('value', function(snapshot) {
        console.log('value: ', snapshot.val()); 
    });
    rootRef.on('child_added', function(snapshot) {
        console.log('child_added: ', snapshot.val()); 
    });
    rootRef.on('child_removed', function(snapshot) {
        console.log('child_removed: ', snapshot.val()); 
    });
    rootRef.on('child_changed', function(snapshot) {
        console.log('child_changed: ', snapshot.val()); 
    });*/
}]);