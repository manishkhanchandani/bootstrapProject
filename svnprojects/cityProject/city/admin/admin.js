'use strict';

angular.module('myApp.admin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'admin/admin.html',
    controller: 'AdminCtrl'
  }).when('/admin/config/', {
    templateUrl: 'admin/config.html',
    controller: 'AdminConfigCtrl'
  }).when('/admin/cart/', {
    templateUrl: 'admin/cart.html',
    controller: 'AdminCartCtrl'
  }).when('/admin/cart/category/', {
    templateUrl: 'admin/cart.html',
    controller: 'AdminCartCategoryCtrl'
  }).when('/admin/cart/config/', {
    templateUrl: 'admin/cart.html',
    controller: 'AdminCartConfigCtrl'
  })
  ;
}])

.controller('AdminCtrl', ['$scope', function($scope) {

}])
.controller('AdminConfigCtrl', ['$scope', function($scope) {

}])
.controller('AdminCartCtrl', ['$scope', function($scope) {
    $scope.templatesrc = 'admin/includes/inc_cart.html';
}])
.controller('AdminCartCategoryCtrl', ['$scope', function($scope) {
    $scope.templatesrc = 'admin/includes/inc_category.html';
    var categoryRef = $scope.ref.child('cartCategories');
    //$scope.city.mainHostUrl
    $scope.firebaseCategory = $firebaseArray(categoryRef);
    $scope.adminCat = {};
    $scope.adminCategorySubmit = function () {
        console.log($scope.adminCat);
        $scope.firebaseCategory.$add($scope.adminCat).then(function(returnVar) {
            $scope.adminCat = {};
            $scope.message = 'Category added successfully';
        });
    };
}])
.controller('AdminCartConfigCtrl', ['$scope', function($scope) {
    $scope.templatesrc = 'admin/includes/inc_config.html';
}])

;