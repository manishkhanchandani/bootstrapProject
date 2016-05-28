'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
  $routeProvider.when('/about', {
    templateUrl: 'view1/about.html',
    controller: 'AboutCtrl'
  });
  $routeProvider.when('/services', {
    templateUrl: 'view1/services.html',
    controller: 'ServicesCtrl'
  });
  $routeProvider.when('/contacts', {
    templateUrl: 'view1/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('View1Ctrl', [function() {

}])

.controller('AboutCtrl', [function() {

}])

.controller('ServicesCtrl', [function() {

}])

.controller('ContactsCtrl', [function() {

}]);