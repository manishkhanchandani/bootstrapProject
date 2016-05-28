// JavaScript Document
angular.module('myApp').directive('helloWorld', function() {
    return {
        restrict: 'AEC',
        templateUrl: 'directives/helloworld.html'
    }
});