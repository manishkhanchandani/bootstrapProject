'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/classifieds/post', {
    templateUrl: 'view1/classifieds/post.html',
    controller: 'ClassifiedsPostCtrl'
  })
  .when('/classifieds/post/:action', {
    templateUrl: 'view1/classifieds/post.html',
    controller: 'ClassifiedsPostCtrl'
  });
}])

.filter('object2Array', function() { return function(input) { var out = []; for(var i in input){ out.push(input[i]); } return out; } })

.controller('View1Ctrl', [function() {

}])

.controller('ClassifiedsPostCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.data = {};
  $scope.data.category = null;
  $scope.data.error = {};
  $scope.data.step = null;

  if ($routeParams.action) {
    $scope.data.step = $routeParams.action;
  }

  //autocomplete
  $scope.details = {};
  $scope.mapOptions = {
    types: 'geocode' //types: '(cities)'
  };
  //autocomplete


  $scope.parentCategory = 0;
  $scope.category = {
    'job_offered': {'key': 'job_offered', 'name': 'Job Offered', 'amount': 0, 'parent': 0, 'sorting': 1},
    'gig_offered': {'key': 'gig_offered', 'name': 'Gig Offered', 'amount': 0, 'parent': 0, 'sorting': 2},
    'wanted_by_dealer': {'key': 'wanted_by_dealer', 'name': 'Wanted by Dealer', 'amount': 0, 'parent': 0, 'sorting': 3},
    'jo_accounting_finance': {'key': 'jo_accounting_finance', 'name': 'accounting/finance', 'amount': 0, 'parent': 'job_offered', 'sorting': 1},
    'jo_admin_office': {'key': 'jo_admin_office', 'name': 'admin/office', 'amount': 0, 'parent': 'job_offered', 'sorting': 2},
    'computer_gigs': {'key': 'computer_gigs', 'name': 'computer gigs (small web design, tech support, etc projects)', 'amount': 0, 'parent': 'gig_offered', 'sorting': 1},
   'creative_gigs': {'key': 'creative_gigs', 'name': 'creative gigs (small design, photography, illustration projects)', 'amount': 0, 'parent': 'gig_offered', 'sorting': 2}
 };

  $scope.stepType = function() {
    $scope.data.error.type = null;
    if (!$scope.data.category) {
      $scope.data.error.type = "Please choose the category";
      return;
    }
      angular.forEach($scope.category, function(value, key) {
        if (value.parent == $scope.data.category) {
          $scope.parentCategory = $scope.data.category;
        }
    });
  };

  $scope.stepLocation = function(details) {
    console.log(details.components);
  };

}]);
