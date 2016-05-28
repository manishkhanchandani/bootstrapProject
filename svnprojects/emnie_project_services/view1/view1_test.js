'use strict';

//if(!$scope.$$phase) $scope.$apply();

angular.module('myApp.view1', ['ngRoute', 'angularUtils.directives.dirPagination'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
	isLogin: true
  })
  .when('/main/:locType/:sortType/:locID', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/main/:locType/:sortType/:locID/:categoryId', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/post', {
    templateUrl: 'view1/postSteps.html',
    controller: 'PostCtrl'
  })
  .when('/step2/:id', {
    templateUrl: 'view1/postSteps.html',
    controller: 'Step2Ctrl'
  })
  .when('/step2/:id/:coupon', {
    templateUrl: 'view1/postSteps.html',
    controller: 'Step2Ctrl'
  })
  .when('/step3/:id', {
    templateUrl: 'view1/postSteps.html',
    controller: 'Step3Ctrl'
  })
  ;
}])

.filter('displayCategory', function() {
  return function(cat, allCat) {
	  return allCat[cat].name;
  };
})

/*
 * http://stackoverflow.com/questions/18095727/limit-the-length-of-a-string-with-angularjs
Usage:

{{some_text | cut:true:100:' ...'}}

Options:

wordwise (boolean) - if true, cut only by words bounds,
max (integer) - max length of the text, cut to this number of chars,
tail (string, default: ' …') - add this string to the input string if the string was cut.
An other solution: http://ngmodules.org/modules/angularjs-truncate (by @Ehvince)
 */
.filter('cut', function () {
	return function (value, wordwise, max, tail) {
		if (!value) return '';

		max = parseInt(max, 10);
		if (!max) return value;
		if (value.length <= max) return value;

		value = value.substr(0, max);
		if (wordwise) {
			var lastspace = value.lastIndexOf(' ');
			if (lastspace != -1) {
				value = value.substr(0, lastspace);
			}
		}

		return value + (tail || ' …');
	};
})
	
.filter('btoa', function() {
  return function(str) {
	  return btoa(str);
  };
})

.filter('atob', function() {
  return function(str) {
	  return atob(str);
  };
})

.controller('Step2Ctrl', ['$scope', 'mkServices', '$location', '$routeParams', 'config', function($scope, mkServices, $location, $routeParams, config) {
	console.log(config);
	console.log('we are in step 2');
	console.log($routeParams.id);
	$scope.data = {};
	$scope.step1Css = 'primary';
	$scope.step2Css = 'primary';
	$scope.step3Css = 'default';
	$scope.step2 = true;
	$scope.step1 = false;
	$scope.step3 = false;
	$scope.frm = {};
	
	$scope.frm.itemName = 'Profile ' + $routeParams.id;

	//check if valid post is present in pending state
	$scope.ref.child('postingPending').child($routeParams.id).once('value', function(returnVar) {
		var check = returnVar.val();
		if (!check) {
			$location.path('/post');	
			if(!$scope.$$phase) $scope.$apply();
			return;
		}
		console.log(check);
		$scope.frm.uid = check.owner_id;
		$scope.frm.custom = {user_id: check.owner_id, id: $routeParams.id};
		if(!$scope.$$phase) $scope.$apply();
	});
	
	$scope.frm.confirmURL = config.paypal.confirmURL+$routeParams.id;
	$scope.frm.cancelURL = config.paypal.cancelURL+$routeParams.id;
	$scope.frm.notifyURL = config.paypal.notifyURL;
	$scope.frm.itemNumber = $routeParams.id;
	
	$scope.updatePricing = function(coupon) {
		if (!coupon) {
			$scope.totalCost = config.cost.profile;
			return;	
		}
		console.log(coupon);
		console.log(config.coupons[coupon]);
		if (config.coupons[coupon]) {
			$scope.trail_amount = config.coupons[coupon].trail_amount;
			$scope.trail_period_number = config.coupons[coupon].trail_period_number;
			$scope.subscription_amount = config.coupons[coupon].subscription_amount;
			$scope.subscription_period_number = config.coupons[coupon].subscription_period_number;
			$scope.trail_period_type = config.coupons[coupon].trail_period_type;
			$scope.subscription_period_type = config.coupons[coupon].subscription_period_type;
		}
	};
	
	if ($routeParams.coupon) {
		$scope.data.coupon = $routeParams.coupon;
		$scope.updatePricing($routeParams.coupon);
	} else if (config.default_coupon !== "") {
		$scope.updatePricing(config.default_coupon);
	}

	$scope.nextStep = function() {
		$location.path('/step3/'+$routeParams.id);	
	};
}])

.controller('Step3Ctrl', ['$scope', 'mkServices', '$location', '$routeParams', function($scope, mkServices, $location, $routeParams) {
	console.log('we are in step 3');
	$scope.step1Css = 'primary';
	$scope.step2Css = 'primary';
	$scope.step3Css = 'primary';
	$scope.step2 = false;
	$scope.step1 = false;
	$scope.step3 = true;
}])

.controller('PostCtrl', ['$scope', 'mkServices', '$location', function($scope, mkServices, $location) {
	
	if (!$scope.userData) {
		alert('please login first');
		$location.path('/');
		return false;	
	}
	
	$scope.data = {};
	$scope.error = {};
	$scope.details = {};
	$scope.mapOptions = {
      types: 'geocode'
    };
	
	$scope.services = mkServices.services();
	$scope.step1Css = 'primary';
	$scope.step2Css = 'default';
	$scope.step3Css = 'default';
	$scope.step2 = false;
	$scope.step1 = true;
	$scope.step3 = false;
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
		//location adding completed
		var postRef = {};
		postRef.title = $scope.data.title;
		postRef.description = $scope.data.description;
		postRef.category = $scope.data.selectedItem.key;
		postRef.owner_id = $scope.userData.uid;
		postRef.lat = details.geometry.location.lat();
		postRef.lng = details.geometry.location.lng();
		postRef.location = details.formatted_address;
		postRef.address2 = $scope.data.address2 || '';
		postRef.email = $scope.data.email || '';
		postRef.phone = $scope.data.phone || '';
		postRef.skype = $scope.data.skype || '';
		postRef.whatsapp = $scope.data.whatsapp || '';
		postRef.charges = $scope.data.charges || '';
		postRef.image = $scope.data.image || '';
		postRef.createdAt = Firebase.ServerValue.TIMESTAMP;
		//console.log(postRef);
		//var pushRef = $scope.ref.child('posting').push(postRef);
		var pushRef = $scope.ref.child('postingPending').push(postRef);
		var id = pushRef.key();
		//console.log("id is ", id);
		/*
		$scope.ref.child('users').child($scope.userData.uid).child('ownedProfiles').child(id).set(true);
		$scope.ref.child('browsePostings').child('citywise').child(btoa(details.components.country)).child(btoa(details.components.state)).child(btoa(details.components.city)).child(btoa(postRef.category)).child(id).set(true);
		$scope.ref.child('browsePostings').child('statewise').child(btoa(details.components.country)).child(btoa(details.components.state)).child(btoa(postRef.category)).child(id).set(true);
		$scope.ref.child('browsePostings').child('countrywise').child(btoa(details.components.country)).child(btoa(postRef.category)).child(id).set(true);
		$scope.ref.child('browsePostings').child('countywise').child(btoa(details.components.country)).child(btoa(details.components.state)).child(btoa(details.components.county)).child(btoa(postRef.category)).child(id).set(true);
		*/
		
		$scope.ref.child('users').child($scope.userData.uid).child('ownedPendingProfiles').child(id).set(true);
		$scope.error.post = 	'New post created successfully.';
		$scope.data = {};
		$location.path('/step2/'+id);
	};
	
}])

.controller('View1Ctrl', ['$scope', '$firebaseArray', '$firebaseObject', '$routeParams', 'mkServices', '$location', 'paginationService', '$filter', 'uiGmapGoogleMapApi', 'uiGmapLogger', function($scope, $firebaseArray, $firebaseObject, $routeParams, mkServices, $location, paginationService, $filter, GoogleMapApi, $log) {


	var primaryRef, secondaryRef;
	$scope.data = {};
	$scope.details = {};
	$scope.mapOptions = {
      types: '(cities)'
    };
	
	
	

	$scope.services = mkServices.services();
	
	function returnGoToCity()
	{
		var url = '';
		url = url + '/main/'+$scope.data.selectedLoc.key+'/'+$scope.data.selectedSort.key+'/'+btoa($scope.data.autocomplete);
		if ($scope.data.selectedService) {
			url = url + '/' + $scope.data.selectedService.key;
		}
		$location.path(url);
		return;
	}
	
	$scope.goToCity = function() {
		if (!$scope.data.autocomplete) {
			return false;	
		}
		mkServices.addLocation($scope.ref, $scope.data.autocomplete, $scope.details, false, returnGoToCity);
	};

	$scope.cityDataDetails = null;
	$scope.locId = null;
	$scope.category = null;
	$scope.categoryId = null;
	$scope.listingDetails = [];
	$scope.newsFeedListing = [];
	$scope.newsFeedListingCount = 0;
    //$scope.cityData = $firebaseArray($scope.ref.child('locations'));
	console.log($routeParams);
	//paging
	$scope.perPageRecords = 500;
	$scope.currentPage = 1;
    $scope.pageSize = 100;
    $scope.itemCount = 0;
    $scope.pageChangeHandler = function(num) {
        console.log('groups page changed to ' + num);
    };

    $scope.changeFilter = function() {
        paginationService.setCurrentPage('mainProfile', 1);
        $scope.currentPage = 1;
    };
	//paging
	
	//locType
	$scope.locations = {
		county: {name: 'Within County', key: 'county'},
		state: {name: 'Within State', key: 'state'},
		country: {name: 'Within Country', key: 'country'},
		city: {name: 'Within City', key: 'city'},
	};
	$scope.data.selectedLoc = $scope.locations['county'];
	$scope.locType = null;
	$scope.locTypeName = null;
	if ($routeParams.locType) {
		$scope.data.selectedLoc = $scope.locations[$routeParams.locType];
		$scope.locType = $routeParams.locType;
	}
	
	$scope.locTypeName = $scope.data.selectedLoc['name'];
	$scope.displayLocation = null;
	//locType
	
	
	//sortType
	$scope.sorting = {
		distAsc: {name: 'Distance Asc', key: 'distAsc', value: 'distance'},
		createdDesc: {name: 'Created At Desc', key: 'createdDesc', value: '-createdAt'},
		distDesc: {name: 'Distance Desc', key: 'distDesc', value: '-distance'},
		createdAsc: {name: 'Created At Asc', key: 'createdAsc', value: 'createdAt'}
	};
	$scope.data.selectedSort = $scope.sorting['createdDesc'];
	$scope.sortType = null;
	$scope.sortTypeName = null;
	if ($routeParams.sortType) {
		$scope.data.selectedSort = $scope.sorting[$routeParams.sortType];
		$scope.sortType = $routeParams.sortType;
	}
	
	$scope.sortTypeName = $scope.data.selectedSort['name'];
	$scope.sortTypeValue = $scope.data.selectedSort['value'];
	//sortType

	$scope.changeLocationForm = function() {
		$scope.goToCity();
	};

	$scope.$watch(
			"details",
			function handleCityDataChange( newValue, oldValue ) {
				if (!newValue.components) return;
				$scope.goToCity();
	});
	
	function getData(result) {
		result.categoryName = $filter('displayCategory')(result.category, $scope.services);
		if ($scope.details.components) {
			result.distance = mkServices.distance($scope.details.components.lat, $scope.details.components.lng, result.lat, result.lng, 'M');
		}//end if
		$scope.listingDetails.push(result);
		$scope.map.markers.push({
          id: result.key,
          icon: 'images/'+result.category+'32x32.png',
          latitude: result.lat,
          longitude: result.lng,
          showWindow: false,
		  title: result.title
        });
		if (!$scope.$$phase) $scope.$apply();
		/*{
          id: 1,
          latitude: 45,
          longitude: -74,
          showWindow: false,
          options: {
            animation: 1,
            labelContent: 'Markers id 1',
            labelAnchor: "22 0",
            labelClass: "marker-labels"
          }
        }
		if(!$scope.$$phase) {
			$scope.$apply(function() {
				$scope.listingDetails.push(result);
			});
		} else {
			$scope.listingDetails.push(result);
		}*/
	}
	
	function getNewsFeed(result) {
		if(!$scope.$$phase) {
			$scope.$apply(function() {
				$scope.newsFeedListing.push(result);
			});
		} else {
			$scope.newsFeedListing.push(result);
		}
		$scope.newsFeedListingCount++;
	}
	
	
	$scope.showViewReplyBoxContent = {};
	$scope.showReplyBox = {};
	$scope.replyBox = {};
	$scope.showViewReplyBox = {};
	$scope.showViewReplyBoxContent = [];
	$scope.showReplyBoxFn = function(k) {
		alert('under construction');
		return false;
		$scope.showReplyBox[k] = ($scope.showReplyBox[k]) ? false : true;
	};
	$scope.replyBoxSubmit = function(k, list) {
		alert('under construction');
		return false;
		if (!$scope.replyBox[k]) {
			return false;	
		}
		if (!$scope.userData) {
			return false;	
		}
		var p = {};
		p.reply = $scope.replyBox[k];
		p.timestamp = Firebase.ServerValue.TIMESTAMP;
		p.uid = $scope.userData.uid;
		$scope.ref.child('newsfeedComments').child(list.key).push(p);
		$scope.replyBox[k] = '';
		$scope.showReplyBox[k] = false;
	};
	$scope.showViewReplyBoxFn = function(k, list) {
		alert('under construction');
		return false;
		if (!$scope.showViewReplyBoxContent[k]) {
			$scope.showViewReplyBoxContent[k] = [];
			$scope.ref.child('newsfeedComments').child(list.key).once('value', function(replyVar) {
				angular.forEach(replyVar.val(), function(v1, k1) {
					var ret = v1;
					$scope.ref.child('users').child(v1.uid).once('value', function(usersVar) {
						var ui = usersVar.val();
						ret.userInfo = {firstName: ui.firstName};
						if(!$scope.$$phase) {
							$scope.$apply(function() {
								$scope.showViewReplyBoxContent[k].push(ret);
							});
						} else {
							$scope.showViewReplyBoxContent[k].push(ret);
						}
					});
				});
			});
		}
		
		$scope.showViewReplyBox[k] = ($scope.showViewReplyBox[k]) ? false : true;
	};
	
	//map options
	//map options end
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
		
		
		//adding news feed on home page
		primaryRef = $scope.ref.child('newsfeed').endAt().limitToLast(100);
		primaryRef.on('child_added', function(childSnapshot) {
			var ret = childSnapshot.val();
			$scope.ref.child('users').child(ret.owner_id).once('value', function(usersVar) {
					var ui = usersVar.val();
					ret.userInfo = {firstName: ui.firstName};
					if(!$scope.$$phase) {
						$scope.$apply(function() {
							$scope.newsFeedListing.push(ret);
						});
					} else {
						$scope.newsFeedListing.push(ret);
					}
					$scope.newsFeedListingCount++;
				});
		});
		//end adding news feed on home page
	};
	
	if ($routeParams.categoryId) {
		$scope.data.selectedService = $scope.services[$routeParams.categoryId];
	};
	
	if ($routeParams.locID) {
		$scope.locId = $routeParams.locID;
		
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
				
				
				
				//google map api
				GoogleMapApi.then(function(maps) {
					//maps.visualRefresh = true;
					console.log(maps);
					
				});
				var onMarkerClicked = function (marker) {
					marker.showWindow = true;
					$scope.$apply();
					//window.alert("Marker: lat: " + marker.latitude + ", lon: " + marker.longitude + " clicked!!")
				};
				
				
				angular.extend($scope, {
					map: {
					  show: true,
					  control: {},
					  version: "uknown",
					  showTraffic: false,
					  center: {
						latitude: newValue.lat,
						longitude: newValue.lng
					  },
					  options: {
						streetViewControl: true,
						panControl: true,
						maxZoom: 30,
						minZoom: 3
					  },
					  zoom: 13,
					  dragging: false,
					  markers: []
					}
				});
				//google map api ends
				$scope.listingDetails = [];
				$scope.newsFeedListing = [];
				$scope.newsFeedListingCount = 0;
				
				
				if ($routeParams.categoryId) {
					switch ($routeParams.locType) {
						case 'city':
							console.log('cityWise');
							//mkServices.cityWise($scope.ref, $firebaseObject, 'browsePostings', 'posting', newValue.country, newValue.state, newValue.city, $routeParams.categoryId, getData);
							primaryRef = $scope.ref.child('browsePostings').child('citywise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa(newValue.city)).child(btoa($routeParams.categoryId));
							secondaryRef = $scope.ref.child('posting');
							mkServices.queryLevel1(primaryRef, secondaryRef, $scope.ref, getData);
							$scope.displayLocation = newValue.city;
							
							primaryRef = $scope.ref.child('browseNewsFeed').child('citywise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa(newValue.city)).endAt().limitToLast($scope.perPageRecords);
							secondaryRef = $scope.ref.child('newsfeed');
							mkServices.queryLevel1(primaryRef, secondaryRef, $scope.ref, getNewsFeed);
							break;
						case 'state':
							console.log('stateWise');
							//mkServices.stateWise($scope.ref, $firebaseObject, 'browsePostings', 'posting', newValue.country, newValue.state, $routeParams.categoryId, getData);
							primaryRef = $scope.ref.child('browsePostings').child('statewise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa($routeParams.categoryId));
							secondaryRef = $scope.ref.child('posting');
							mkServices.queryLevel1(primaryRef, secondaryRef, $scope.ref, getData);
							$scope.displayLocation = newValue.state;
							
							primaryRef = $scope.ref.child('browseNewsFeed').child('statewise').child(btoa(newValue.country)).child(btoa(newValue.state)).endAt().limitToLast($scope.perPageRecords);
							secondaryRef = $scope.ref.child('newsfeed');
							mkServices.queryLevel1(primaryRef, secondaryRef, $scope.ref, getNewsFeed);
							break;
						case 'country':
							console.log('countryWise');
							//mkServices.countryWise($scope.ref, $firebaseObject, 'browsePostings', 'posting', newValue.country, $routeParams.categoryId, getData);
							primaryRef = $scope.ref.child('browsePostings').child('countrywise').child(btoa(newValue.country)).child(btoa($routeParams.categoryId));
							secondaryRef = $scope.ref.child('posting');
							mkServices.queryLevel1(primaryRef, secondaryRef, $scope.ref, getData);
							$scope.displayLocation = newValue.country;
							
							primaryRef = $scope.ref.child('browseNewsFeed').child('countrywise').child(btoa(newValue.country)).endAt().limitToLast($scope.perPageRecords);
							secondaryRef = $scope.ref.child('newsfeed');
							mkServices.queryLevel1(primaryRef, secondaryRef, $scope.ref, getNewsFeed);
							break;
						case 'county':
						default:
							console.log('countyWise');
							//mkServices.countyWise($scope.ref, $firebaseObject, 'browsePostings', 'posting', newValue.country, newValue.state, newValue.county, $routeParams.categoryId, getData);
							primaryRef = $scope.ref.child('browsePostings').child('countywise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa(newValue.county)).child(btoa($routeParams.categoryId));
							secondaryRef = $scope.ref.child('posting');
							mkServices.queryLevel1(primaryRef, secondaryRef, $scope.ref, getData);
							$scope.displayLocation = newValue.county;
							
							primaryRef = $scope.ref.child('browseNewsFeed').child('countywise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa(newValue.county)).endAt().limitToLast($scope.perPageRecords);
							secondaryRef = $scope.ref.child('newsfeed');
							mkServices.queryLevel1(primaryRef, secondaryRef, $scope.ref, getNewsFeed);
							break;
					}
				} else {
					switch ($routeParams.locType) {
						case 'city':
							console.log('cityWiseNoCat');
							//mkServices.cityWiseNoCat($scope.ref, $firebaseObject, 'browsePostings', 'posting', newValue.country, newValue.state, newValue.city, getData);
							primaryRef = $scope.ref.child('browsePostings').child('citywise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa(newValue.city));
							secondaryRef = $scope.ref.child('posting');
							mkServices.queryLevel2(primaryRef, secondaryRef, $scope.ref, getData);
							$scope.displayLocation = newValue.city;
							
							primaryRef = $scope.ref.child('browseNewsFeed').child('citywise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa(newValue.city)).endAt().limitToLast($scope.perPageRecords);
							secondaryRef = $scope.ref.child('newsfeed');
							mkServices.queryLevel1(primaryRef, secondaryRef, $scope.ref, getNewsFeed);
							break;
						case 'state':
							console.log('stateWiseNoCat');
							//mkServices.stateWiseNoCat($scope.ref, $firebaseObject, 'browsePostings', 'posting', newValue.country, newValue.state, getData);
							primaryRef = $scope.ref.child('browsePostings').child('statewise').child(btoa(newValue.country)).child(btoa(newValue.state));
							secondaryRef = $scope.ref.child('posting');
							mkServices.queryLevel2(primaryRef, secondaryRef, $scope.ref, getData);
							$scope.displayLocation = newValue.state;
							
							primaryRef = $scope.ref.child('browseNewsFeed').child('statewise').child(btoa(newValue.country)).child(btoa(newValue.state)).endAt().limitToLast($scope.perPageRecords);
							secondaryRef = $scope.ref.child('newsfeed');
							mkServices.queryLevel1(primaryRef, secondaryRef, $scope.ref, getNewsFeed);
							break;
						case 'country':
							console.log('countryWiseNoCat');
							//mkServices.countryWiseNoCat($scope.ref, $firebaseObject, 'browsePostings', 'posting', newValue.country, getData);
							primaryRef = $scope.ref.child('browsePostings').child('countrywise').child(btoa(newValue.country));
							secondaryRef = $scope.ref.child('posting');
							mkServices.queryLevel2(primaryRef, secondaryRef, $scope.ref, getData);
							$scope.displayLocation = newValue.country;
							
							primaryRef = $scope.ref.child('browseNewsFeed').child('countrywise').child(btoa(newValue.country)).endAt().limitToLast($scope.perPageRecords);
							secondaryRef = $scope.ref.child('newsfeed');
							mkServices.queryLevel1(primaryRef, secondaryRef, $scope.ref, getNewsFeed);
							break;
						case 'county':
						default:
							console.log('countyWiseNoCat');
							//mkServices.countyWiseNoCat($scope.ref, $firebaseObject, 'browsePostings', 'posting', newValue.country, newValue.state, newValue.county, getData);
							primaryRef = $scope.ref.child('browsePostings').child('countywise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa(newValue.county));
							secondaryRef = $scope.ref.child('posting');
							mkServices.queryLevel2(primaryRef, secondaryRef, $scope.ref, getData);
							$scope.displayLocation = newValue.county;
							
							primaryRef = $scope.ref.child('browseNewsFeed').child('countywise').child(btoa(newValue.country)).child(btoa(newValue.state)).child(btoa(newValue.county)).endAt().limitToLast($scope.perPageRecords);
							secondaryRef = $scope.ref.child('newsfeed');
							mkServices.queryLevel1(primaryRef, secondaryRef, $scope.ref, getNewsFeed);
			
							break;
					}	
				}
			}//end function
		);
	}
	
	if ($routeParams.categoryId) {
		$scope.category = $scope.services[$routeParams.categoryId];
		$scope.data.selectedItem = $scope.services[$routeParams.categoryId];
	}

	
	$scope.newsfeedsubmit = function() {
		if (!$scope.userData) {
			return false;	
		}	
		var newsRef = {};
		newsRef.newsfeed = $scope.data.newsfeed;
		newsRef.location = $scope.data.autocomplete;
		newsRef.owner_id = $scope.userData.uid;
		newsRef.createdAt = Firebase.ServerValue.TIMESTAMP;
		var newsRefPost = $scope.ref.child('newsfeed').push(newsRef);
		var id = newsRefPost.key();
		$scope.ref.child('users').child($scope.userData.uid).child('ownedNewsFeed').child(id).set(true);
		$scope.ref.child('browseNewsFeed').child('citywise').child(btoa($scope.details.components.country)).child(btoa($scope.details.components.state)).child(btoa($scope.details.components.city)).child(id).set(newsRef.createdAt);
		$scope.ref.child('browseNewsFeed').child('statewise').child(btoa($scope.details.components.country)).child(btoa($scope.details.components.state)).child(id).set(newsRef.createdAt);
		$scope.ref.child('browseNewsFeed').child('countrywise').child(btoa($scope.details.components.country)).child(id).set(newsRef.createdAt);
		$scope.ref.child('browseNewsFeed').child('countywise').child(btoa($scope.details.components.country)).child(btoa($scope.details.components.state)).child(btoa($scope.details.components.county)).child(id).set(newsRef.createdAt);
		$scope.data.newsfeed = null;
	}
	
}]);