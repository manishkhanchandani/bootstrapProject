'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.directive('dirH1', function() {
    return {
        templateUrl: 'view1/dirH1.html',
        scope: {
            
        },
        link: function(scope, elem, attrs) {
           console.log('this is inside directive');
           scope.name = 'mango';
           scope.dosomething = function() {
               console.log('hey you clicked me');
           };
        }
    }
})

.directive('dirH2', function() {
    return {
        templateUrl: 'view1/dirH2.html',
        scope: {
            
        },
        link: function(scope, elem, attrs) {
           console.log('this is h2 directive');
        }
    }
})

.directive('dirH3', function() {
    return {
        templateUrl: 'view1/dirH3.html',
        scope: {
            
        },
        link: function(scope, elem, attrs) {
           console.log('this is h3 directive');
        }
    }
})

.controller('View1Ctrl', [function() {

}]);