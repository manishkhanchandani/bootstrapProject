'use strict';

// Declare app level module which depends on views, and components
angular.module('ngSocialApp', [
  'ngRoute',
  'ngSocialApp.facebook'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);