'use strict';

//if(!$scope.$$phase) $scope.$apply();

angular.module('myApp.view1', ['ngRoute', 'angularUtils.directives.dirPagination', 'angularFileUpload'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
	isLogin: true
  })
  .when('/main/:locType/:sortType/:locID/:lat/:lng', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/main/:locType/:sortType/:locID/:lat/:lng/:categoryId', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/main/:locType/:sortType/:city/:state/:country/:lat/:lng', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/main/:locType/:sortType/:city/:state/:country/:lat/:lng/:categoryId', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/post', {
    templateUrl: 'view1/postSteps.html',
    controller: 'PostCtrl'
  })
  .when('/post/:id', {
    templateUrl: 'view1/detail.html',
    controller: 'DetailCtrl'
  })
  .when('/stepImages/:id', {
    templateUrl: 'view1/postSteps.html',
    controller: 'stepImagesCtrl'
  })
  .when('/stepReview/:id', {
    templateUrl: 'view1/postSteps.html',
    controller: 'stepReviewCtrl'
  })
  .when('/stepReview/:id/:coupon', {
    templateUrl: 'view1/postSteps.html',
    controller: 'stepReviewCtrl'
  })
  .when('/stepConfirm/:id', {
    templateUrl: 'view1/postSteps.html',
    controller: 'StepConfirmCtrl'
  })
  .when('/cancel/:id', {
    templateUrl: 'view1/postSteps.html',
    controller: 'CancelCtrl'
  })
  .when('/sample', {
    templateUrl: 'view1/sample.html',
    controller: 'SampleCtrl'
  })
  .when('/user/:id', {
    templateUrl: 'view1/profile.html',
    controller: 'ProfileCtrl'
  })
  .when('/ref/:id', {
    templateUrl: 'view1/ref.html',
    controller: 'RefCtrl'
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
.filter('encodeURIComponent', function() {
  return function(str) {
    return encodeURIComponent(str);
  };
})

/*

<!-- flag Directive -->
<div flag-profile record="list"></div>
<!-- flag ends -->
*/
.directive('flagProfile', function() {
    return {
        scope: {
          record: '='
        },
        templateUrl: 'directives/flag.html',
        link: function(scope, elem, attrs) {
          console.log(scope);
          scope.flagPost = function(rec, desc) {
            console.log('clicked record is ', rec);
            console.log('desc record is ', desc);
          }
        }
    };
})

.controller('DetailCtrl', ['$scope', '$routeParams', 'mkServices', function($scope, $routeParams, mkServices) {
  console.log($routeParams);
  $scope.services = mkServices.services();
  $scope.postDetails = {};
  $scope.postDetails.isEditable = false;
  $scope.postDetails.mainImage = null;
  $scope.postDetails.images = null;
  
  $scope.setImage = function(image) {
    $scope.postDetails.mainImage = image.name;
  }

  $scope.ref.child('posting').child($routeParams.id).once('value', function(returnVar) {
    $scope.postDetails = returnVar.val();
    $scope.postDetails.categoryName = $scope.services[$scope.postDetails.category].name;
    if ($scope.userData) {
      if ($scope.userData.uid === $scope.postDetails.owner_id) {
        $scope.postDetails.isEditable = true;
      }
    }
    $scope.ref.child('users').child($scope.postDetails.owner_id).once('value', function(usersVar) {
      $scope.postDetails.userInfo = usersVar.val();
      
      $scope.ref.child('postingImages').child($scope.postDetails.owner_id).child($routeParams.id).orderByChild("timestamp").once('value', function(returnVar) {
        $scope.postDetails.images = returnVar.val();
        if ($scope.postDetails.images) {
          var cnt = 0;
          angular.forEach($scope.postDetails.images, function(res, key) {
            if (cnt === 0) {
              cnt++;
              $scope.postDetails.mainImage = res.name;
              return;
            }
          });
        }
        if(!$scope.$$phase) $scope.$apply();
      });
      
      
      $scope.ref.child('locations').child($scope.postDetails.location_id).once('value', function(locationVar) {
        $scope.postDetails.locationInfo = locationVar.val();
        $scope.postDetails.key = $routeParams.id;
        //create share buttons
        stButtons.makeButtons();
        //create share buttons ends
        if(!$scope.$$phase) $scope.$apply();
      });
    });
  });
  
}])

.controller('SampleCtrl', ['$scope', function($scope) {
  
}])
.controller('RefCtrl', ['$scope', '$routeParams', '$cookies', '$location', function($scope, $routeParams, $cookies, $location) {
  console.log($routeParams);
  // Retrieving a cookie
  var refCookie = $cookies.get('refCookie');
  if (!refCookie) {
    // Setting a cookie
    $cookies.put('refCookie', $routeParams.id);  
  }
  $location.path('/');
}])
.controller('ProfileCtrl', ['$scope', '$routeParams', 'config', 'mkServices', '$location', function($scope, $routeParams, config, mkServices, $location) {
  $scope.id = $routeParams.id;
  $scope.refUrl = null;
  if ($scope.userData) {
    if ($scope.userData.uid === $routeParams.id) {
      $scope.refUrl = config.siteURL + 'ref/' + $routeParams.id;
    }
  }
  $scope.userDetails = null;
  $scope.mycities = null;
  
  $scope.openProfile = function(list) {
    $location.path('/user/' + list.uid);
    return; 
  };
  
  //referred by list
  $scope.refChainList = null;
  function refChainfn(list) {
    console.log('list is ', list);
    $scope.refChainList = [];
    angular.forEach(list, function(value, key) {
      $scope.ref.child('users').child(value).once("value", function(snapshot) {
        $scope.refChainList.push(snapshot.val());
        if(!$scope.$$phase) $scope.$apply();
      });
    });
  }
  mkServices.refChain($scope.ref, $routeParams.id, refChainfn);
  //referred by list

  $scope.ref.child('users').child($routeParams.id).on("value", function(snapshotUser) {
    $scope.userDetails = snapshotUser.val();
    $scope.mycities = {};
    $scope.mycities.city = {};
    $scope.mycities.county = {};
    $scope.mycities.state = {};
    $scope.mycities.country = {};
    angular.forEach($scope.userDetails.ownedLocations, function(value, key) {
      angular.forEach(value, function(value1, key1) {
        $scope.ref.child('locations').child(value1).once("value", function(snapshotLoc) {
          $scope.mycities[key][key1] = snapshotLoc.val();
          if(!$scope.$$phase) $scope.$apply();
        });
      });
    });
    console.log($scope.userDetails);
    if(!$scope.$$phase) $scope.$apply();
  });
}])

.controller('stepImagesCtrl', ['$scope', 'FileUploader', '$routeParams', '$location', function($scope, FileUploader, $routeParams, $location) {
  if (!$scope.userData) {
    console.log('no userdata present');
    $location.path('/');
    return;
  }
  if (!$scope.userData.uid) {
    console.log('no uid present');
    $location.path('/');
    return;
  }
  if (!$routeParams.id) {
    console.log('no id present');
    $location.path('/');
    return;
  }
	$scope.stepProfileCss = 'primary';
	$scope.stepImagesCss = 'primary';
	$scope.stepReviewCss = 'default';
	$scope.stepConfirmCss = 'default';
	$scope.stepProfile = false;
	$scope.stepImages = true;
	$scope.stepReview = false;
	$scope.stepConfirm = false;
  
  var uploader = $scope.uploader = new FileUploader({
      url: 'api/upload.php?id=' + $routeParams.id + '&uid=' + $scope.userData.uid
  });
  // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            //console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            //console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            //console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            //console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            //console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            //console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            $scope.ref.child('postingImages').child($scope.userData.uid).child($routeParams.id).child(btoa(fileItem.file.name)).set({name: 'images/userImages/'+$scope.userData.uid + '/' + $routeParams.id + '/' + fileItem.file.name, timestamp: Firebase.ServerValue.TIMESTAMP});
            //console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            //console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            //console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            //console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            //console.info('onCompleteAll');
        };
        //console.info('uploader', uploader);

        $scope.nextStep = function() {
          $location.path('/stepReview/'+$routeParams.id);	
        };
}])

.controller('stepReviewCtrl', ['$scope', 'mkServices', '$location', '$routeParams', 'config', function($scope, mkServices, $location, $routeParams, config) {
	console.log(config);
	console.log('we are in step 2');
	console.log($routeParams.id);
	$scope.data = {};
  
	$scope.stepProfileCss = 'primary';
	$scope.stepImagesCss = 'primary';
	$scope.stepReviewCss = 'primary';
	$scope.stepConfirmCss = 'default';
	$scope.stepProfile = false;
	$scope.stepImages = false;
	$scope.stepReview = true;
	$scope.stepConfirm = false;

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
      var d = new Date();
      var currentTime = d.getTime();
      var currentTimeConverted = Math.round(currentTime / 1000);
      var expiryTime = null;
      console.log(currentTimeConverted);
      if (config.coupons[coupon].subscription_period_type) {
        $scope.subscription_amount = config.coupons[coupon].subscription_amount;
        $scope.subscription_period_number = config.coupons[coupon].subscription_period_number;
        $scope.subscription_period_type = config.coupons[coupon].subscription_period_type;
        $scope.subscription_period_type_label = config.coupons[coupon].subscription_period_type_label;
      }
      if (config.coupons[coupon].trail_period_type) {
        $scope.trail_amount = config.coupons[coupon].trail_amount;
        $scope.trail_period_number = config.coupons[coupon].trail_period_number;
        $scope.trail_period_type = config.coupons[coupon].trail_period_type;
        $scope.trail_period_type_label = config.coupons[coupon].trail_period_type_label;
      }
		}
	};
	
	if ($routeParams.coupon) {
		$scope.data.coupon = $routeParams.coupon;
		$scope.updatePricing($routeParams.coupon);
	} else if (config.default_coupon !== "") {
		$scope.updatePricing(config.default_coupon);
	}

	$scope.nextStep = function() {
		$location.path('/stepConfirm/'+$routeParams.id);	
	};
}])

.controller('stepConfirmCtrl', ['$scope', 'mkServices', '$location', '$routeParams', function($scope, mkServices, $location, $routeParams) {
	console.log('we are in step 3');
	$scope.stepProfileCss = 'primary';
	$scope.stepImagesCss = 'primary';
	$scope.stepReviewCss = 'primary';
	$scope.stepConfirmCss = 'primary';
	$scope.stepProfile = false;
	$scope.stepImages = false;
	$scope.stepReview = false;
	$scope.stepConfirm = true;
}])

.controller('CancelCtrl', ['$scope', 'mkServices', '$location', '$routeParams', function($scope, mkServices, $location, $routeParams) {
	console.log('we are in step cancel');
  $scope.cancel = true;
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
  
	$scope.stepProfileCss = 'primary';
	$scope.stepImagesCss = 'default';
	$scope.stepReviewCss = 'default';
	$scope.stepConfirmCss = 'default';
	$scope.stepProfile = true;
	$scope.stepImages = false;
	$scope.stepReview = false;
	$scope.stepConfirm = false;

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
		//location adding started
    mkServices.addLocation($scope.ref, details.components.location, details, false);
		//location adding completed
		var postRef = {};
		postRef.title = $scope.data.title;
		postRef.description = $scope.data.description;
		postRef.category = $scope.data.selectedItem.key;
		postRef.owner_id = $scope.userData.uid;
		postRef.lat = details.geometry.location.lat();
		postRef.lng = details.geometry.location.lng();
		postRef.location = details.formatted_address;
		postRef.location_id = btoa(details.components.location);
		postRef.address2 = $scope.data.address2 || '';
		postRef.email = $scope.data.email || '';
		postRef.phone = $scope.data.phone || '';
		postRef.skype = $scope.data.skype || '';
		postRef.whatsapp = $scope.data.whatsapp || '';
		postRef.charges = $scope.data.charges || '';
		postRef.image = $scope.data.image || '';
		postRef.createdAt = Firebase.ServerValue.TIMESTAMP;
    postRef.submitterDetails = '';
    if ($scope.ipDetails) {
      if ($scope.ipDetails.result) {
        postRef.submitterDetails = $scope.ipDetails.result;
      }
    }
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
		$location.path('/stepImages/'+id);
	};
	
}])

.controller('View1Ctrl', ['$scope', '$firebaseArray', '$firebaseObject', '$routeParams', 'mkServices', '$location', 'paginationService', '$filter', 'uiGmapGoogleMapApi', 'uiGmapLogger', '$timeout', function($scope, $firebaseArray, $firebaseObject, $routeParams, mkServices, $location, paginationService, $filter, GoogleMapApi, $log, $timeout) {

  $scope.showLoading = false;
	var primaryRef, secondaryRef;
	$scope.data = {};
	$scope.details = {};
	$scope.mapOptions = {
      types: 'geocode' //types: '(cities)'
    };

  $scope.showDetails = function(id) {
    $location.path('/post/' + id);
  }

	$scope.services = mkServices.services();
	
	function returnGoToCity()
	{
		var url = '';
		url = url + '/main/'+$scope.data.selectedLoc.key+'/'+$scope.data.selectedSort.key+'/'+btoa($scope.details.components.location) + '/' + $scope.details.components.lat + '/' + $scope.details.components.lng;
		if ($scope.data.selectedService) {
			url = url + '/' + $scope.data.selectedService.key;
		}
		$location.path(url);
    if (!$scope.$$phase) $scope.$apply();
		return;
	}
	
	$scope.goToCity = function() {
		if (!$scope.data.autocomplete) {
			return false;
		}
		mkServices.addLocation($scope.ref, $scope.details.components.location, $scope.details, returnGoToCity);
	};
  
  
  function onError(error) {
   $scope.showLoading = false;
   if (!$scope.$$phase) $scope.$apply();
   alert(error.message);
  };

  $scope.setCurrentLocation = function() {
    if (navigator.geolocation) {
      $scope.showLoading = true;
      navigator.geolocation.getCurrentPosition(function(position) {
        var geocoder = new google.maps.Geocoder;
        var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              var result = results[0];
              //custom
                var componentForm = {
                  street_number: 'short_name',
                  route: 'long_name',
                  locality: 'long_name',
                  administrative_area_level_1: 'short_name',
                  administrative_area_level_2: 'short_name',
                  country: 'long_name',
                  postal_code: 'short_name'
                };
                $scope.details.components = {};
                for (var component in componentForm) {
                    $scope.details.components[component] = null;
                }
                $scope.details.components['state'] = null;
                $scope.details.components['city'] = null;
                for (var i = 0; i < result.address_components.length; i++) {
                    if (typeof(result.address_components[i].types[0]) !== "undefined") {
                        var addressType = result.address_components[i].types[0];
                        if (componentForm[addressType]) {
                            var val = result.address_components[i][componentForm[addressType]];
                            $scope.details.components[addressType] = val;
                        }
                    }
                 }
                 $scope.details.components['state'] = $scope.details.components['administrative_area_level_1'];
                 $scope.details.components['county'] = $scope.details.components['administrative_area_level_2'];
                 $scope.details.components['city'] = $scope.details.components['locality'];
                 $scope.details.components['location'] = $scope.details.components['city'] + ', ' + $scope.details.components['state'] + ', ' + $scope.details.components['country'];
                 $scope.details.components['lat'] = result.geometry.location.lat();
                 $scope.details.components['lng'] = result.geometry.location.lng();
                 $scope.details.place_id = result.place_id;
                 $scope.data.autocomplete = $scope.details.components['location'];
                 $scope.showLoading = false;
                 if (!$scope.$$phase) $scope.$apply();
                 $scope.goToCity();
                //custom ends
            } else {
              $scope.showLoading = false;
              window.alert('No results found');
            }
          } else {
            $scope.showLoading = false;
            window.alert('Geocoder failed due to: ' + status);
          }
        });//end geocoder.geocode
      }, onError, { timeout: 30000 });//end navigator.geolocation
    }//end if (navigator.geolocation)
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
    if ($routeParams.locID) {
      $scope.map.markers.push({
            id: result.key,
            icon: 'images/'+result.category+'32x32.png',
            latitude: result.lat,
            longitude: result.lng,
            showWindow: false,
            title: result.title
          });
    }
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
    $scope.newsFeedListing.push(result);
    $scope.newsFeedListingCount++;
    if(!$scope.$$phase) $scope.$apply();
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
        var ret = result;
        ret.key = key;
        $scope.ref.child('users').child(ret.owner_id).once('value', function(usersVar) {
					console.log('users details: ', usersVar.val());
					var ui = usersVar.val();
					ret.userInfo = {firstName: ui.firstName};
					console.log('ret: ', ret);
					getData(ret);
				});
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
        console.log(newValue);
				$scope.details.components = {};
				$scope.details.components.city = newValue.city;
				$scope.details.components.state = newValue.state;
				$scope.details.components.country = newValue.country;
				$scope.details.components.lat = newValue.lat;
				$scope.details.components.lng = newValue.lng;
				$scope.details.components.county = newValue.county;
				$scope.details.components.location = $scope.details.components.city + ', ' + $scope.details.components.state+ ', ' + $scope.details.components.country;
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
						latitude: $routeParams.lat,
						longitude: $routeParams.lng
					  },
					  options: {
						streetViewControl: true,
						panControl: true,
						maxZoom: 30,
						minZoom: 3
					  },
					  zoom: 15,
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
    $scope.startNewsFade = false;
    $scope.newsFeedMsg = null;
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
    $scope.newsFeedMsg = 'News Feed Added Successfully';
    $timeout(function(){
        $scope.startNewsFade = true;
    }, 1000);
    $timeout(function(){
        $scope.newsFeedMsg = null;
    }, 2000);
	}
	
}]);