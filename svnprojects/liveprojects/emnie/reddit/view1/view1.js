'use strict';

angular.module('myApp.view1', ['ngRoute', 'ui.bootstrap'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  $routeProvider.when('/new', {
    templateUrl: 'view1/new.html',
    controller: 'NewCtrl'
  })
  .when('/accordian', {
    templateUrl: 'view1/accordian.html',
    controller: 'AccordianCtrl'
  })
  .when('/iptolocation', {
    templateUrl: 'view1/ip.html',
    controller: 'IpCtrl'
  })
  .when('/category', {
    templateUrl: 'view1/category.html',
    controller: 'CategoryCtrl'
  })
  .when('/post', {
    templateUrl: 'view1/post.html',
    controller: 'PostCtrl'
  });
}])

.controller('View1Ctrl', [function() {

}])
.controller('NewCtrl', ['$scope', '$http', '$firebaseArray', function($scope, $http, $firebaseArray) {
//.controller('NewCtrl', ['$scope', '$http', function($scope, $http) {
	
	//var url = "api/new.json";
	//var url = "https://radiant-inferno-4789.firebaseio.com/reddit";
	/*$http({
		method: "GET",
		url: url
	})
	.then(
		function successCallback(response) {
			$scope.myResponse = response.data;
			alert(response.data);
		},
		function errorCallback(response) {
			console.log("Error Call Back" + response);
		}
	);*/
	var ref = new Firebase("https://radiant-inferno-4789.firebaseio.com/reddit");
    
    $scope.myResponse = $firebaseArray(ref);
	console.log("myResponse is "+$scope.myResponse);
}])
.controller('IpCtrl', ['$scope', '$http', function($scope, $http) {
  var url = "api/iptolocation.php?ip=130.65.251.129";
  /*$http({ 
    method: 'GET', 
	url: url 
  })
  .then(
      function successCallback(response) { 
	    console.log(response.data+' end'); 
		$scope.myResponse = response.data;
		console.log($scope.myResponse);
	  }, function errorCallback(response) 
	  { 
	    console.log('error call back'); 
		console.log(response); 
	  }
   );*/
   $http.jsonp('http://ipinfo.io/?callback=JSON_CALLBACK')
    .success(function(data) {
    $scope.ip = data.ip;
    $scope.hostname = data.hostname;
    $scope.loc = data.loc; //Latitude and Longitude
    $scope.org = data.org; //organization
    $scope.city = data.city;
    $scope.region = data.region; //state
    $scope.country = data.country;
    $scope.phone = data.phone; //city area code
	$scope.zip = data.postal;
	console.log(data.loc);
	$scope.lat = data.loc.split(',')[0];
	$scope.lon = data.loc.split(',')[1];
  });

}])
.controller('CategoryCtrl', ['$scope', '$http', function($scope, $http) {
  var url = "api/sample1.json";
  $http({ 
    method: 'GET', 
	url: url 
  })
  .then(
      function successCallback(response) { 
	    console.log(response.data); 
		$scope.myResponse = response.data;
		console.log($scope.myResponse);
	  }, function errorCallback(response) 
	  { 
	    console.log('error call back'); 
		console.log(response); 
	  }
   );

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
.controller('PostCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
	$scope.data = {};
    $scope.error = null;
    //$scope.data.selectedItem = {};
	
	$scope.posting = function(details) {
        if (!$scope.userData) {
		alert('Please log in first');
		$location.path('/');
		return false;
	}
    //create variable to submit the data
		var post = {};
		post.imgUrl = "http://i.imgur.com/57AOikp.png" || '';
		//post.subject= "from you" || '';
		post.subject= $scope.article.title || '';
		post.submitTime = Firebase.ServerValue.TIMESTAMP;
		post.author = "you" || '';
		post.voteNum = "100" || '';
		post.commentNum = $scope.article.content || '';
		post.owner_id = $scope.userData.uid;
		var pushRef = $scope.ref.child('reddit').push(post);
        //get the submitted id
        /*var id = pushRef.key();
        $scope.ref.child('users').child($scope.userData.uid).child('ownedProfiles').child(id).set(true);
		$scope.ref.child('browsePostings').child('citywise').child(btoa(details.components.country)).child(btoa(details.components.state)).child(btoa(details.components.city)).child(btoa(post.category_id)).child(id).set(true);
        $scope.ref.child('browsePostings').child('statwise').child(btoa(details.components.country)).child(btoa(details.components.state)).child(btoa(post.category_id)).child(id).set(true);
        $scope.ref.child('browsePostings').child('countrywise').child(btoa(details.components.country)).child(btoa(post.category_id)).child(id).set(true);
        $scope.ref.child('browsePostings').child('countywise').child(btoa(details.components.country)).child(btoa(details.components.state)).child(btoa(details.components.county)).child(btoa(post.category_id)).child(id).set(true);
        */
		$scope.error = 'Your post was successfully submitted';
        $scope.data = {};
		$location.path('/new');
		//we will add more firebase insertion next time, for better browsing and searching
	};
		
}])
;