'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
    var ref = new Firebase('https://mycontacts12.firebaseio.com/web/project2');
    // download the data into a local object
    var syncObject = $firebaseObject(ref);
    // three way data binding
    syncObject.$bindTo($scope, 'days');
    
    // function to set the default data
  $scope.reset = function() {    

    ref.set({
      monday: {
        name: 'Monday',
        slots: {
          "0900": {
            time: '9:00am',
            booked: false
          },
          "0110": {
            time: '11:00am',
            booked: false
          }
        }
      },
      tuesday: {
        name: 'Tuesday',
        slots: {
          "0900": {
            time: '9:00am',
            booked: false
          },
          "0110": {
            time: '11:00am',
            booked: false
          }
        }
      }
    });    

  };
}]);