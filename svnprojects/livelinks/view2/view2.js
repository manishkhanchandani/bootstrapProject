'use strict';

angular.module('myApp.view2', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
    var ref = new Firebase('https://mycontacts12.firebaseio.com/livelinks');
    ref.on('child_added', function(snapshot) {
        console.log('child_added: ', snapshot.val()); 
    });
    
    //1. Adding simple link to submitting to your livelinks app
    $scope.s = {};
    $scope.submitlink = function() {
        console.log($scope.s);
        ref.push($scope.s);
        $scope.s = {};
    }
    
    //2. Providing a way for your livelinks users to view submitted links
    var syncObject = $firebaseObject(ref);
    // three way data binding
    syncObject.$bindTo($scope, 'data');
    
    //3. Ensuring that connected users see links as they are added to your livelinks app in real-time
}]);