'use strict';

angular.module('myApp.organon', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/organon', {
    templateUrl: 'organon/organon.html',
    controller: 'OrganonCtrl'
  }).when('/organon/:aphorism', {
    templateUrl: 'organon/pages.html',
    controller: 'OrganonPagesCtrl'
  });
}])

.controller('OrganonCtrl', [function() {

}])
.controller('OrganonPagesCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.actualTemplateUrl = 'organon/pages/' + $routeParams.aphorism + '.html';
    console.log($scope.actualTemplateUrl);
}])
;