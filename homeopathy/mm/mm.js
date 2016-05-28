'use strict';

angular.module('myApp.mm', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mm', {
    templateUrl: 'mm/mm.html',
    controller: 'MMCtrl'
  }).when('/mm/:remedy', {
    templateUrl: 'mm/remedy.html',
    controller: 'MMRemedyCtrl'
  });
}])

.controller('MMCtrl', [function() {

}])
.controller('MMRemedyCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.actualTemplateUrl = 'mm/remedies/' + $routeParams.remedy + '.html';
    console.log($scope.actualTemplateUrl);
}])
;