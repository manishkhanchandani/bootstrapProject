'use strict';

angular.module('templateStore.templates', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/templates', {
    templateUrl: 'templates/templates.html',
    controller: 'TempatesCtrl'
  })
  .when('/templates/:templateId', {
    templateUrl: 'templates/templates-details.html',
    controller: 'TempatesDetailsCtrl'
  });
}])
.controller('TempatesCtrl', ['$scope', '$http', function($scope, $http) {
    console.log('templates controller');
    $http.get('json/templates.json').success(function(response) {
            $scope.templates = response;
        }
    );
}])
.controller('TempatesDetailsCtrl', ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter) {
    var templateId = $routeParams.templateId;
    console.log('templates details controller with templateId: ' + templateId);
    $http.get('json/templates.json').success(function(response) {
            $scope.template = $filter('filter')(response, function(d) {
                return d.id == templateId;
            })[0];
            $scope.mainImage = $scope.template.images[0].name;
            console.log($scope.template);
        }
    );
    $scope.setImage = function(image) {
        $scope.mainImage = image.name;
    }
}]);