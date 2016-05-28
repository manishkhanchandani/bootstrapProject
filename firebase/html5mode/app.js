'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
  // use the HTML5 History API
  $locationProvider.html5Mode({
        enabled: true,
        requireBase: true,
        rewriteLinks: false
    });
}]);

angular.module('myApp').run(($rootScope) => {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});