'use strict';

angular.module('myApp.view1', ['ngRoute', 'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/iptolocation', {
    templateUrl: 'view1/ip.html',
    controller: 'IpCtrl'
  })
  .when('/category', {
    templateUrl: 'view1/category.html',
    controller: 'CategoryCtrl'
  })
  .when('/accordian', {
    templateUrl: 'view1/accordian.html',
    controller: 'AccordianCtrl'
  });;
}])

.controller('View1Ctrl', [function() {

}])
.controller('AccordianCtrl', ['$scope', function($scope) {
$scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
}])

.controller('IpCtrl', ['$scope', '$http', function($scope, $http) {
  var url = "api/iptolocation.php?ip=130.65.251.129";
  $http({ 
    method: 'GET', 
	url: url 
  })
  .then(
      function successCallback(response) { 
	    console.log(response); 
		$scope.myResponse = response.data.result;
		console.log($scope.myResponse);
	  }, function errorCallback(response) 
	  { 
	    console.log('error call back'); 
		console.log(response); 
	  }
   );

}])
.controller('CategoryCtrl', ['$scope', '$http', function($scope, $http) {
  var url = "api/sample1.json";
  $http({ 
    method: 'GET', 
	url: url 
  })
  .then(
      function successCallback(response) { 
	    console.log(response); 
		$scope.myResponse = response.data.result;
		console.log($scope.myResponse);
	  }, function errorCallback(response) 
	  { 
	    console.log('error call back'); 
		console.log(response); 
	  }
   );

}])
;