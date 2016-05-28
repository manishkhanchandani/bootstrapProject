'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.admin',
  'ngAutocomplete',
  'firebase',
  'uiGmapgoogle-maps',
  'ngCookies'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
  //$locationProvider.hashPrefix('!');
}])

.constant('config', {
    siteURL: 'http://bootstrap.mkgalaxy.com/svnprojects/mk/prjServices/',
    appName: 'Service Industry',
    appVersion: 1.0,
    appUrl: 'http://serviceme.com',
	paypal: {
		confirmURL: 'http://bootstrap.mkgalaxy.com/svnprojects/mk/prjServices/step3/',
		cancelURL: 'http://bootstrap.mkgalaxy.com/svnprojects/mk/prjServices/cancel/',
		notifyURL: 'http://bootstrap.mkgalaxy.com/svnprojects/mk/prjServices/pages/ipnNotify.php',
	},
	cost: {
		owner: 40,
		admin: 40,
		other: 20
	},
	default_coupon: 'default',
	coupons: {
		'one': {
			trail_amount: 0,
			trail_period_number: 1,
			trail_period_type: 'D',
			trail_period_type_label: 'day',
      trail_expiration: (60*60*24*1),
			subscription_amount: 0.01,
			subscription_period_number: 1,
			subscription_period_type: 'D',
			subscription_period_type_label: 'day',
      subscription_expiration: (60*60*24*1),
			status: true
		},
		'ZVZ': {
			trail_amount: 0,
			trail_period_number: 6,
			trail_period_type: 'M',
			trail_period_type_label: 'months',
      trail_expiration: (60*60*24*182),
			subscription_amount: 20.00,
			subscription_period_number: 1,
			subscription_period_type: 'Y',
			subscription_period_type_label: 'year',
      subscription_expiration: (60*60*24*365),
			status: true
		},
		'YVY': {
			trail_amount: 0,
			trail_period_number: 3,
			trail_period_type: 'M',
			trail_period_type_label: 'months',
      trail_expiration: (60*60*24*91),
			subscription_amount: 20.00,
			subscription_period_number: 1,
			subscription_period_type: 'Y',
			subscription_period_type_label: 'year',
      subscription_expiration: (60*60*24*365),
			status: true
		},
		'XVX': {
			trail_amount: 0,
			trail_period_number: 1,
			trail_period_type: 'M',
			trail_period_type_label: 'months',
      trail_expiration: (60*60*24*30),
			subscription_amount: 20.00,
			subscription_period_number: 1,
			subscription_period_type: 'Y',
			subscription_period_type_label: 'year',
      subscription_expiration: (60*60*24*365),
			status: true
		},
		'default': {
			subscription_amount: 0.01,
			subscription_period_number: 1,
			subscription_period_type: 'Y',
			subscription_period_type_label: 'year',
      subscription_expiration: (60*60*24*365),
			status: true
		}
	}
})

.filter('atob', function() {
  return function(str) {
	  return atob(str);
  };
})

.filter('daysAgo', function() {
  return function(date) {
		var seconds = Math.floor((new Date() - date) / 1000);
		
		var interval = Math.floor(seconds / 31536000);
		
		if (interval > 1) {
			return interval + " years ago";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months ago";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days ago";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours ago";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes ago";
		}
		return Math.floor(seconds) + " seconds ago";
  };
})

.controller('mainController', ['$scope', '$location', '$rootScope', 'mkServices', '$cookies', function($scope, $location, $rootScope, mkServices, $cookies) {



	$scope.ref = new Firebase('https://mycontacts12.firebaseio.com/projectServices');
	$scope.userData = null;
  
  //ref by
  // Retrieving a cookie
  var refCookie = $cookies.get('refCookie');
  console.log('getting cookie', refCookie);
  if ($location.search().refBy) {//http://bootstrap.mkgalaxy.com/svnprojects/mk/prjServices/user/google:105422089059112846002?refBy=google:105422089059112846002
    //if (!refCookie) {
      // Setting a cookie
      console.log('setting cookie: ', $location.search().refBy);
      $cookies.put('refCookie', $location.search().refBy);  
    //}
  };

	/*
	$scope.userLocation = {};
	
	var geocoder = new google.maps.Geocoder;
	

	if (navigator.geolocation) {
		var locationMarker = null;
		navigator.geolocation.getCurrentPosition(
			function( position ){
				//console.log(position);
				if (locationMarker){
					return;
				}
				//console.log( "Initial Position Found. ", position.coords.latitude, ', ',  position.coords.longitude);
				var latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
				geocoder.geocode({'location': latlng}, function(results, status) {
				  if (status === google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						console.log(results[0]);
						var componentForm = {
						  street_number: 'short_name',
						  route: 'long_name',
						  locality: 'long_name',
						  administrative_area_level_1: 'short_name',
						  administrative_area_level_2: 'short_name',
						  country: 'long_name',
						  postal_code: 'short_name'
						};
						for (var component in componentForm) {
							$scope.userLocation[component] = null;
						}
						for (var i = 0; i < results[0].address_components.length; i++) {
                        var addressType = results[0].address_components[i].types[0];
                        if (componentForm[addressType]) {
                            var val = results[0].address_components[i][componentForm[addressType]];
                            //$scope.details.components[addressType] = val;
							$scope.userLocation[addressType] = val;
                        }
                    //}
                 	}
					 $scope.userLocation['state'] = $scope.userLocation['administrative_area_level_1'];
					 $scope.userLocation['county'] = $scope.userLocation['administrative_area_level_2'];
					 $scope.userLocation['city'] = $scope.userLocation['locality'];
					 $scope.userLocation['location'] = $scope.userLocation['city'] + ', ' + $scope.userLocation['state'] + ', ' + $scope.userLocation['country'];
					 $scope.userLocation['autocomplete'] = $scope.userLocation['location'];
					 $scope.userLocation['lat'] = results[0].geometry.location.lat();
					 $scope.userLocation['lng'] = results[0].geometry.location.lng();
					 $scope.userLocation['place_id'] = results[0].place_id;
					 $scope.userLocation['formatted_address'] = results[0].formatted_address;
					 var data = {}
					 data.address = $scope.userLocation['formatted_address'];
					 data.lat = $scope.userLocation['lat'];
					 data.lng = $scope.userLocation['lng'];
					 data.place_id = $scope.userLocation['place_id'];
					 var loc = {};
					 loc.country = $scope.userLocation['country'];
					 loc.state = $scope.userLocation['state'];
					 loc.city = $scope.userLocation['city'];
					 loc.county = $scope.userLocation['county'];
					 //mkServices.tracking($scope.ref, 'userLocation', data, loc);
					} else {
					  console.log('No results found');
					}
				  } else {
					console.log('Geocoder failed due to: ' + status);
				  }
				});	
			},
			function( error ){
				console.log( "Something went wrong: ", error );
					  alert('Please enable location to access this website');
					  window.location.href = 'http://google.com';
					  return;
			},
			{
				timeout: (5 * 1000),
				maximumAge: (1000 * 60 * 15),
				enableHighAccuracy: true
			}
		);
	};
	*/
	function logInUser()
	{
		var authData = $scope.ref.getAuth();
		if (!authData) return false;
		var id = authData.google.id || '';
		var email = authData.google.cachedUserProfile.email || '';
		var displayName = authData.google.displayName || '';
		var profileImageURL = authData.google.profileImageURL || '';
		var provider = authData.provider || '';
		var gender = authData.google.cachedUserProfile.gender || '';
		var slink = authData.google.cachedUserProfile.link || '';
		var family_name = authData.google.cachedUserProfile.family_name || '';
		var given_name = authData.google.cachedUserProfile.given_name || '';
		$scope.userData = {'uid': authData.uid, 'id': id, 'email': email, 'name': displayName, 'img': profileImageURL, 'provider': provider, 'gender': gender, 'link': slink, 'lastName': family_name, 'firstName': given_name};
	}
	//log in
	logInUser();

	/*
	$rootScope.$on('$routeChangeStart', function (event, next) {
		if (next.isLogin) {
			return false;
		}//end if
		
		var userAuthenticated = $scope.userData;
		if (!userAuthenticated) {
			$rootScope.savedLocation = $location.url();
			console.log('a1', $rootScope.savedLocation);
			$location.path('/view1');
			return false;
		}
		
		if ($scope.userData) {
			$scope.ref.child('users').child($scope.userData.uid).once('value', function(ret) {
				$scope.$apply(function() {
					$scope.userData = ret.val();
					if (next.access) {
						for (var x in next.access) {
							if (next.access[x] === 'superadmin' && 1$scope.userData.superadmin) {
								$location.path('/view1');
								return false;
							} else if (next.access[x] === 'member' && !$scope.userData.member) {
								$location.path('/view1');
								return false;
							}
						}
						$rootScope.savedLocation = $location.url();
						$location.path('/view1');
						return false;
					}
				});
			});
		}
	  });
	  */

	//onAuth
	function authDataCallback(authData) {
		//console.log('authdata', authData);
		if (authData) {
		  console.log("User is logged in");
		  $scope.ref.child('users').child(authData.uid).once('value', function(ret) {
				  $scope.$apply(function() {
					  $scope.userData = ret.val();
					  //console.log('userdata: ', $scope.userData);
				  });
			  });
		} else {
		  console.log("User is logged out");
		  $scope.userData = null;
		}
	}
	
	$scope.ref.onAuth(authDataCallback);
	
	
	$scope.googleLogin = function() {
		//console.log('google login is here');	
		$scope.ref.authWithOAuthPopup("google", function(error, authData) {
			if (error) {
			  console.log("Login Failed!", error);
			} else {
        $scope.ref.child('users').child(authData.uid).once("value", function(snapshot) {
          var a = snapshot.exists();
          if (!a) {
            console.log('creating user');
            var id = authData.google.id || '';
            var email = authData.google.cachedUserProfile.email || '';
            var displayName = authData.google.displayName || '';
            var profileImageURL = authData.google.profileImageURL || '';
            var provider = authData.provider || '';
            var gender = authData.google.cachedUserProfile.gender || '';
            var slink = authData.google.cachedUserProfile.link || '';
            var family_name = authData.google.cachedUserProfile.family_name || '';
            var given_name = authData.google.cachedUserProfile.given_name || '';
            var createdAt = Firebase.ServerValue.TIMESTAMP;
            var lastLoginDt = Firebase.ServerValue.TIMESTAMP;
            var refCookie = $cookies.get('refCookie');
            var refBy = 'google:112913147917981568678';
            var refByDefault = true;
            if (refCookie) {
              refBy = refCookie;
              refByDefault = false;
            }
            $scope.userData = {'uid': authData.uid, 'id': id, 'email': email, 'name': displayName, 'img': profileImageURL, 'provider': provider, 'gender': gender, 'link': slink, 'lastName': family_name, 'firstName': given_name, 'updatedAt': updatedAt, 'member': true, 'refBy': refBy, 'refByDefault': refByDefault};
            $scope.ref.child('users').child(authData.uid).update($scope.userData);
          } else {
            console.log('user already exists'); 
          }//end if (!a)
        });//end $scope.ref.child('users')
			}//end if
		}, {
		  remember: "sessionOnly",
		  scope: "email"
		});//end authwithpopup
	};//end google login
	
	$scope.googleLogout = function() {
		//console.log('google logout is here');
		$scope.ref.unauth();
        $scope.userData = null;	
	};//end google logout
  
  
  
  
  
  $scope.ipDetails = null
  function getIpDetails(res) {
    $scope.ipDetails = res.data;
    console.log('ipdetails: ', $scope.ipDetails);
  }

  mkServices.ip(getIpDetails);

}])

//google maps
.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
  GoogleMapApi.configure({
//    key: 'your api key',
    // v: '3.20',
    libraries: 'weather,geometry,visualization'
  });
}])
;
