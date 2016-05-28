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
           console.log('in directive one - dirH1'); 
        }
    }
})
.directive('dirH2', function() {
    return {
        templateUrl: 'view1/dirH2.html',
        scope: {
            
        },
        link: function(scope, elem, attrs) {
           console.log('in directive two - dirH2');
           scope.clickme = function() {
               console.log('you clicked me');
           }
        }
    }
})
    
.controller('View1Ctrl', [function() {

}]);