'use strict';

angular.module('myApp.view1', ['ngRoute', 'pascalprecht.translate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/arnica', {
    templateUrl: 'view1/arnica.html',
    controller: 'View1GeneralCtrl'
  }).when('/hom', {
    templateUrl: 'view1/hom.html',
    controller: 'View1GeneralCtrl'
  });
}])

.config(function ($translateProvider) {
        $translateProvider.translations('en', {
          TITLE: 'Hello',
          FOO: 'This is a paragraph.',
          BUTTON_LANG_EN: 'english',
          BUTTON_LANG_DE: 'german'
        });
        $translateProvider.translations('de', {
          TITLE: 'Hallo',
          FOO: 'Dies ist ein Absatz.',
          BUTTON_LANG_EN: 'englisch',
          BUTTON_LANG_DE: 'deutsch'
        });
        $translateProvider.preferredLanguage('en');
      })

.controller('View1Ctrl', ['$scope', '$translate', function($scope, $translate) {
    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
}]).controller('View1GeneralCtrl', ['$scope', function($scope) {
}]);