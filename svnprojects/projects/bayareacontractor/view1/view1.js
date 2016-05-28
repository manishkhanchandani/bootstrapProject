'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/about', {
    templateUrl: 'view1/about.html',
    controller: 'AboutCtrl'
  }).when('/services', {
    templateUrl: 'view1/services.html',
    controller: 'ServicesCtrl'
  }).when('/contact', {
    templateUrl: 'view1/contact.html',
    controller: 'ContactCtrl'
  }).when('/ask', {
    templateUrl: 'view1/ask.html',
    controller: 'AskCtrl'
  }).when('/ask/:page', {
    templateUrl: 'view1/ask.html',
    controller: 'AskCtrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.updateLinks('home');
}])
.controller('AboutCtrl', ['$scope', function($scope) {
  $scope.updateLinks('about');
}])
.controller('ServicesCtrl', ['$scope', function($scope) {
  $scope.updateLinks('services');
}])
.controller('ContactCtrl', ['$scope', function($scope) {
  $scope.updateLinks('contact');
}])
.controller('AskCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
  $scope.updateLinks('ask');
  $scope.frm = {};
  $scope.changePage = function(pageNum_rsView) {
    if (pageNum_rsView === 0) {
      $location.path('/ask');
      return;
    }
    $location.path('/ask/'+pageNum_rsView);
    return;
  };
  
  $scope.callResult = function(pageNum_rsView) {
    $http({
      method: 'GET',
      url: 'api/askresult.php?page=' + pageNum_rsView,
      cache: true
    }).then(function successCallback(response) {
        //console.log('success call back');
        if (!response || !response.data || !response.data.success) {
          console.log('error1');
          console.log(response);
          return;
        }
        $scope.data = response.data.data;
        $scope.data.pageNum_rsView = $scope.data.page;
        $scope.data.totalPages_rsView = $scope.data.totalPages;
        $scope.data.totalRows_rsView = $scope.data.totalRows;
        $scope.data.maxRows_rsView = $scope.data.max;
        $scope.data.startRow_rsView = $scope.data.start;
        $scope.data.prevPage = ($scope.data.pageNum_rsView - 1) > 0 ? ($scope.data.pageNum_rsView - 1) : 0;
        $scope.data.nextPage = $scope.data.totalPages_rsView < ($scope.data.pageNum_rsView + 1) ? $scope.data.totalPages_rsView : ($scope.data.pageNum_rsView + 1);
      }, function errorCallback(response) {
        console.log('error call back');
        console.log(response);
      });  
  };
  
  $scope.askQuestion = function() {
    console.log($scope.frm);
    $http({
      method: 'POST',
      url: 'api/ask.php',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: 'email='+encodeURIComponent($scope.frm.email)+'&question='+encodeURIComponent($scope.frm.question)+'&name='+encodeURIComponent($scope.frm.name)
    }).then(function successCallback(response) {
        //console.log('success call back');
        //console.log(response);
        $scope.frm = {};
        $scope.frm.error = 'Your question is sent successfully. You will hear back from us within 24-48 hours';
      }, function errorCallback(response) {
        console.log('error call back');
        console.log(response);
      });  
  };
  
  var page = 0;
  if ($routeParams.page) {
    page = $routeParams.page;  
  }
  $scope.callResult(page);
}])
;