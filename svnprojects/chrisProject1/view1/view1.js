'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.directive ('dirH1', function(){
  return {
    templateUrl: 'view1/dirH1.html',
    scope: {
    },
    link: function(scope, ele, attrs) {
        console.log('This is inside directive.');
        scope.name = 'mango';
        scope.dosomething = function() {
            console.log('hey, you clicked me');
        };
        scope.dosomething2 = function() {
            console.log('hey, you poked me');
        };
        scope.dosomething3 = function() {
            console.log('hey, you kicked me');
        };
        scope.dosomething4 = function() {
            console.log('hey, you hit me');
        };
        scope.dosomething5 = function() {
            console.log('hey, you tapped me');
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

.directive('dirH4', function() {
    return {
        templateUrl: 'view1/dirH4.html',
        scope: {

        },
        link: function(scope, elem, attrs) {
           console.log('this is h4 directive');
        }
    }
})

.directive('dirH5', function() {
    return {
        templateUrl: 'view1/dirH5.html',
        scope: {

        },
        link: function(scope, elem, attrs) {
           console.log('this is h5 directive');
        }
    }
})

.directive('dirH6', function() {
    return {
        templateUrl: 'view1/dirH6.html',
        scope: {

        },
        link: function(scope, elem, attrs) {
           console.log('this is h5 directive');
        }
    }
})

.controller('View1Ctrl', [function() {

}]);