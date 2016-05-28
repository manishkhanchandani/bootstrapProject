// JavaScript Document
angular.module('myApp')
    .directive('mylist', function() {
        return {
            templateUrl: 'directives/mylist.html',
            scope: {
                personObject: '=',
                formattedAddrFunction: '&'
            }
        }
    });