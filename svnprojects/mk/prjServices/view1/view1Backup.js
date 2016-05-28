'use strict';

angular.module('myApp.view1', ['ngRoute', 'angularUtils.directives.dirPagination'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
	isLogin: true
  })
  .when('/main/:locType/:locID', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/main/:locType/:locID/:categoryId', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/post', {
    templateUrl: 'view1/post.html',
    controller: 'PostCtrl'
  })
  ;
}])

.filter('displayCategory', function() {
  return function(cat, allCat) {
	  return allCat[cat].name;
  };
})

.controller('PostCtrl', ['$scope', 'mkServices', function($scope, mkServices) {
	
	$scope.data = {};
	$scope.error = {};
	$scope.details = {};
	$scope.mapOptions = {
      types: '(cities)'
    };

	$scope.services = mkServices.services();
	$scope.postProfile = function(details) {
		if (!$scope.userData) {
			$scope.error.post = 	'please login first';
			return false;	
		}
		if (!$scope.data.selectedItem) {
			$scope.error.post = 	'Please Select Category';
			return false;
		}
		if (!$scope.data.title) {
			$scope.error.post = 	'Please enter title';
			return false;
		}
		if (!$scope.data.description) {
			$scope.error.post = 	'Please enter description';
			return false;
		}
		//console.log(details);
		//console.log($scope.data);
		//add location in db
		mkServices.addLocation($scope.ref, $scope.data.autocomplete, details, false);
		//location adding completed
		var postRef = {};
		postRef.title = $scope.data.title;
		postRef.description = $scope.data.description;
		postRef.location = $scope.data.autocomplete;
		postRef.category = $scope.data.selectedItem.key;
		postRef.owner_id = $scope.userData.uid;
		postRef.createdAt = Firebase.ServerValue.TIMESTAMP;
		//console.log(postRef);
		var pushRef = $scope.ref.child('posting').push(postRef);
		var id = pushRef.key();
		//console.log("id is ", id);
		$scope.ref.child('users').child($scope.userData.uid).child('ownedProfiles').child(id).set(true);
		$scope.ref.child('browsePostings').child('citywise').child(btoa(details.components.country)).child(btoa(details.components.state)).child(btoa(details.components.city)).child(btoa(postRef.category)).child(id).set(true);
		$scope.ref.child('browsePostings').child('statewise').child(btoa(details.components.country)).child(btoa(details.components.state)).child(btoa(postRef.category)).child(id).set(true);
		$scope.ref.child('browsePostings').child('countrywise').child(btoa(details.components.country)).child(btoa(postRef.category)).child(id).set(true);
		$scope.ref.child('browsePostings').child('countywise').child(btoa(details.components.country)).child(btoa(details.components.state)).child(btoa(details.components.county)).child(btoa(postRef.category)).child(id).set(true);
		$scope.error.post = 	'New post created successfully.';
		$scope.data.title = null;
		$scope.data.description = null;
	};
	
}])

.controller('View1Ctrl', ['$scope', '$firebaseArray', '$firebaseObject', '$routeParams', 'mkServices', '$location', 'paginationService', '$filter', function($scope, $firebaseArray, $firebaseObject, $routeParams, mkServices, $location, paginationService, $filter) {
	
	$scope.data = {};
	$scope.details = {};
	$scope.mapOptions = {
      types: '(cities)'
    };
	

	$scope.services = mkServices.services();
	$scope.locations = {
		county: {name: 'Within County', key: 'county'},
		state: {name: 'Within State', key: 'state'},
		country: {name: 'Within Country', key: 'country'},
		city: {name: 'Within City', key: 'city'},
	};
	$scope.data.selectedLoc = $scope.locations['county'];
	
	function returnGoToCity()
	{
		$location.path('/main/'+$scope.data.selectedLoc.key+'/'+btoa($scope.data.autocomplete));
		return;
	}
	
	$scope.goToCity = function() {
		if (!$scope.data.autocomplete) {
			return false;	
		}
		mkServices.addLocation($scope.ref, $scope.data.autocomplete, $scope.details, returnGoToCity);
	};

	$scope.cityDataDetails = null;
	$scope.locId = null;
	$scope.category = null;
	$scope.categoryId = null;
	$scope.listingDetails = [];
	$scope.newsFeedListing = [];
    //$scope.cityData = $firebaseArray($scope.ref.child('locations'));
	console.log($routeParams);
	//paging
	$scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.itemCount = 0;
    $scope.pageChangeHandler = function(num) {
        console.log('groups page changed to ' + num);
    };

    $scope.changeFilter = function() {
        paginationService.setCurrentPage('__default', 1);
        $scope.currentPage = 1;
    };
	//paging
	
	$scope.currentPageViewUrl = '#/main/view';
	$scope.currentPagePostUrl = '#/main/post';
	
	//locType
	$scope.locType = null;
	$scope.locTypeName = null;
	if ($routeParams.locType) {
		$scope.data.selectedLoc = $scope.locations[$routeParams.locType];
		$scope.locType = $routeParams.locType;
	}
	
	$scope.locTypeName = $scope.data.selectedLoc['name'];
	//locType

	if (!$routeParams.locID) {
		
		$scope.listingDetails = [];
		var ref = $scope.ref.child('posting').orderByChild('createdAt').limitToLast(500);
		var obj = $firebaseObject(ref);
		obj.$watch(function() {
			$scope.listingDetails = [];
			angular.forEach(obj, function(result, key) {
				result.categoryName = $filter('displayCategory')(result.category, $scope.services);
				if(!$scope.$$phase) {
					$scope.$apply(function() {
						$scope.listingDetails.push(result);
					});
				} else {
					$scope.listingDetails.push(result);
				}
			});
		});
	};
	
	function getData(returnVar) {
		var result = returnVar.val();
		result.categoryName = $filter('displayCategory')(result.category, $scope.services);
		if(!$scope.$$phase) {
			$scope.$apply(function() {
				$scope.listingDetails.push(result);
			});
		} else {
			$scope.listingDetails.push(result);
		}
	}
	
	if ($routeParams.locID) {
		$scope.locId = $routeParams.locID;
		$scope.currentPageViewUrl = $scope.currentPageViewUrl + '/' + $scope.locId;
		$scope.currentPagePostUrl = $scope.currentPagePostUrl + '/' + $scope.locId;
		
		
		var syncObject = $firebaseObject($scope.ref.child('locations').child($routeParams.locID));
		syncObject.$bindTo($scope, 'cityDataDetails');
		$scope.$watch(
			"cityDataDetails",
			function handleCityDataChange( newValue, oldValue ) {
				//console.log( "cityDataDetails new val:", newValue );
				if (!newValue) return false;
				$scope.details.components = {};
				$scope.details.components.city = newValue.city;
				$scope.details.components.state = newValue.state;
				$scope.details.components.country = newValue.country;
				$scope.details.components.lat = newValue.lat;
				$scope.details.components.lng = newValue.lng;
				$scope.details.components.county = newValue.county;
				$scope.details.place_id = newValue.place_id;
				$scope.data.autocomplete = newValue.location;
				
				
				//news feed
				/*
				$scope.newsFeedListing = [];
				var refNews = $scope.ref.child('browseNewsFeed').child('citywise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa(newValue.city)).orderByValue().limitToLast(100);
				var objNews = $firebaseObject(refNews);
				objNews.$watch(function() {
					$scope.newsFeedListing = [];
					angular.forEach(objNews, function(value, key) {
						//console.log('key: ', key, ', val: ', value);
						$scope.ref.child('newsfeed').child(key).once('value', function(returnVar) {
							var result = returnVar.val();
							if(!$scope.$$phase) {
								$scope.$apply(function() {
									$scope.newsFeedListing.push(result);
								});
							} else {
								$scope.newsFeedListing.push(result);
							}
						});
					});
				});
				*/
				//end newsfeed
				
				if ($routeParams.categoryId) {
					//start if
					$scope.listingDetails = [];
					mkServices.cityWise($scope.ref, $firebaseObject, 'browsePostings', newValue.country, newValue.state, newValue.city, $routeParams.categoryId, getData);
					/*
					var ref = $scope.ref.child('browsePostings').child('citywise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa(newValue.city)).child(btoa($routeParams.categoryId));
					var obj = $firebaseObject(ref);
					obj.$watch(function() {
						$scope.listingDetails = [];
						angular.forEach(obj, function(value, key) {
							//console.log('key: ', key, ', val: ', value);
							$scope.ref.child('posting').child(key).once('value', function(returnVar) {
								var result = returnVar.val();
								result.categoryName = $filter('displayCategory')(result.category, $scope.services);
								if(!$scope.$$phase) {
									$scope.$apply(function() {
										$scope.listingDetails.push(result);
									});
								} else {
									$scope.listingDetails.push(result);
								}
							});
						});
					});
					
					
					
					*/
					//end if
					/*
					firstMessagesQuery = $scope.ref.child('browsePostings').child('citywise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa(newValue.city)).child(btoa($routeParams.categoryId));
					firstMessagesQuery.on('value', function(childSnapshot) {
						$scope.listingDetails = [];
						console.log(1);
						//console.log('key is: ', childSnapshot.key());
						angular.forEach(childSnapshot.val(), function(value, key) {
							$scope.ref.child('posting').child(key).once('value', function(returnVar) {
								//console.log('listing details: ', returnVar.val());
								var result = returnVar.val();
								result.key = key;
								if(!$scope.$$phase) {
									$scope.$apply(function() {
										$scope.listingDetails.push(result);
									});
								} else {
									$scope.listingDetails.push(result);
								}
							});
						});
					});
					*/
				} else {
					//start else
					$scope.listingDetails = [];
					mkServices.cityWiseNoCat($scope.ref, $firebaseObject, 'browsePostings', newValue.country, newValue.state, newValue.city, getData);
					
					/*var ref = $scope.ref.child('browsePostings').child('citywise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa(newValue.city));
					var obj = $firebaseObject(ref);
					obj.$watch(function() {
						$scope.listingDetails = [];
						angular.forEach(obj, function(value, key) {
							//console.log('key: ', key, ', val: ', value);
							angular.forEach(value, function(value2, key2) {
								//console.log('key2: ', key2, ', val2: ', value2);
								$scope.ref.child('posting').child(key2).once('value', function(returnVar) {
									var result = returnVar.val();
									result.categoryName = $filter('displayCategory')(result.category, $scope.services);
									if(!$scope.$$phase) {
										$scope.$apply(function() {
											$scope.listingDetails.push(result);
										});
									} else {
										$scope.listingDetails.push(result);
									}
								});
							});
						});
					});
					
					
					
					
					*/
					//end else
				}
				
			}
		);
	}
	
	if ($routeParams.categoryId) {
		$scope.category = $scope.services[$routeParams.categoryId];
		$scope.data.selectedItem = $scope.services[$routeParams.categoryId];
		$scope.currentPageViewUrl = $scope.currentPageViewUrl + '/' + $routeParams.categoryId;
		$scope.currentPagePostUrl = $scope.currentPagePostUrl + '/' + $routeParams.categoryId;
	}

	$scope.postProfile = function() {
		if (!$scope.userData) {
			console.log('please login first');
			return false;	
		}
		//console.log($scope.data);
		//console.log($scope.details);
		var postRef = {};
		postRef.title = $scope.data.title;
		postRef.description = $scope.data.description;
		postRef.location = $scope.data.autocomplete;
		postRef.category = $scope.data.selectedItem.key;
		postRef.owner_id = $scope.userData.uid;
		postRef.createdAt = Firebase.ServerValue.TIMESTAMP;
		//console.log(postRef);
		var pushRef = $scope.ref.child('posting').push(postRef);
		var id = pushRef.key();
		//console.log("id is ", id);
		$scope.ref.child('users').child($scope.userData.uid).child('ownedProfiles').child(id).set(true);
		$scope.ref.child('browsePostings').child('citywise').child(btoa($scope.details.components.country)).child(btoa($scope.details.components.state)).child(btoa($scope.details.components.city)).child(btoa(postRef.category)).child(id).set(true);
		//$scope.ref.child('browsePostings').child('statewise').child(btoa($scope.details.components.country)).child(btoa($scope.details.components.state)).child(btoa(postRef.category)).child(id).set(true);
		//$scope.ref.child('browsePostings').child('countrywise').child(btoa($scope.details.components.country)).child(btoa(postRef.category)).child(id).set(true);
		//$scope.ref.child('browsePostings').child('countywise').child(btoa($scope.details.components.country)).child(btoa($scope.details.components.state)).child(btoa($scope.details.components.county)).child(btoa(postRef.category)).child(id).set(true);
	};
	
	
	$scope.newsfeedsubmit = function() {
		if (!$scope.userData) {
			return false;	
		}	
		var newsRef = {};
		newsRef.newsfeed = $scope.data.newsfeed;
		newsRef.owner_id = $scope.userData.uid;
		newsRef.createdAt = Firebase.ServerValue.TIMESTAMP;
		var newsRefPost = $scope.ref.child('newsfeed').push(newsRef);
		var id = newsRefPost.key();
		$scope.ref.child('users').child($scope.userData.uid).child('ownedNewsFeed').child(id).set(true);
		$scope.ref.child('browseNewsFeed').child('citywise').child(btoa($scope.details.components.country)).child(btoa($scope.details.components.state)).child(btoa($scope.details.components.city)).child(id).set(newsRef.createdAt);
		$scope.data.newsfeed = null;
	}
	
}]);