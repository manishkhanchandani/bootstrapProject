'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/view2', {
    templateUrl: 'view1/view2.html',
    controller: 'View1Ctrl'
  }).when('/myReligion', {
    templateUrl: 'view1/my_religion.html',
    controller: 'myReligionCtrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

}])

.controller('myReligionCtrl', ['$scope', 'dataService', '$timeout', function($scope, dataService, $timeout) {
  $scope.data = {};
  $scope.data.name = $scope.userData.name;
  $scope.data.status = 0;
  $scope.startError = false;
  function frmReligionSubmit(data) {
    $scope.data.error = 'Record submitted successfully';
    $timeout(function(){
        $scope.startError = true;
    }, 1000);
    $timeout(function(){
        $scope.data.error = null;
    }, 2000);
  }
  $scope.frmReligion = function() {
    var url = dataService.baseUrl;
    url += '?saveIP=1&access_token='+$scope.userData.access_token;
    
    if (!$scope.data.id) {
      url += '&action=add';
    } else {
      url += '&action=update&id='+$scope.data.id+'&access_token='+$scope.userData.access_token;
    }
    var postData = '';
    postData += 'data[description]='+encodeURIComponent($scope.data.description)+'&title='+encodeURIComponent($scope.data.name)+'&path=/religion/all&appr=1&tid=1&status='+parseInt($scope.data.status)+'&tags='+encodeURIComponent($scope.data.tags);
    dataService.post(url, postData, frmReligionSubmit, false);
  };
}])

;