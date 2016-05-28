Directives

var demo = angular.module('myApp', []);
    angular.module('myApp').directive('simpleDirective', function() {
        return {
            template: '<div>Hello World</div>'
        }
    });

<div simple-directive></div>


A. restrict: 'EA'
B. template: '<div>{{myVal}}</div>'
C. templateUrl
D. scope: {}
E. controller: controller
F. link: function(scope, element, attrs) {}