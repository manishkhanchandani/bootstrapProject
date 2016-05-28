'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'ngCookies'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
}])

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

.controller('mainController', ['$scope', '$cookies', '$location', 'mkServices', function($scope, $cookies, $location, mkServices) {
  $scope.ref = new Firebase('https://mycontacts12.firebaseio.com/ineedmassage');
  $scope.userData = null;
  $scope.userDataReferred = null;
  
  //customize based on host
  $scope.customize = null;
  function hostCallBack(result) {
    $scope.customize = result;
    console.log('customize: ', $scope.customize);
    if(!$scope.$$phase) $scope.$apply();
  }//end function
  
  mkServices.host($location.host(), hostCallBack);
  //end customize
  
  //referred by list
  function refChainfn(list) {
    $scope.userDataReferred = {};
    $scope.userDataReferred.list = list;
    $scope.userDataReferred.details = [];
    if(!$scope.$$phase) $scope.$apply();
    angular.forEach(list, function(value, key) {
      $scope.ref.child('users').child(value).once("value", function(snapshot) {
        $scope.userDataReferred.details.push(snapshot.val());
        if(!$scope.$$phase) $scope.$apply();
      });
    });
  }

  function authDataCallback(authData) {
    if (!authData) {
      console.log('user is logged out');
      $scope.userData = null;
      $scope.userDataReferred = null;
      return;
    }
    
    if(!$scope.$$phase) $scope.$apply();
    $scope.ref.child('users').child(authData.uid).once("value", function(snapshot) {
      if (snapshot.exists()) {
        $scope.userData = snapshot.val();
        //get chain
        mkServices.refChain($scope.ref, authData.uid, refChainfn);
        if(!$scope.$$phase) $scope.$apply();
      }
    });
  };
  $scope.ref.onAuth(authDataCallback);
  
  
  // Retrieving a cookie
  var refCookie = $cookies.get('refCookie');
  console.log('getting cookie', refCookie);
  if ($location.search().refBy) {
    refCookie = $location.search().refBy;
    console.log('setting cookie: ', refCookie);
    $cookies.put('refCookie', refCookie);
  }
  $scope.refCookie = refCookie;
  //ending cookie
  

  //login
  $scope.googleLogin = function() {
    $scope.ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
			  console.log("Login Failed!", error);
        return;
			}
      var uid = authData.uid;
      $scope.ref.child('users').child(uid).once("value", function(snapshot) {
        var a = snapshot.exists();
        if (!a) {
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
          var access_level = 'member';
          var refBy = refCookie || mkServices.refDefaultUser;
          $scope.userData = {'uid': uid, 'id': id, 'email': email, 'name': displayName, 'img': profileImageURL, 'provider': provider, 'gender': gender, 'link': slink, 'lastName': family_name, 'firstName': given_name, 'createdAt': createdAt, 'lastLoginDt': lastLoginDt, 'access_level': access_level, 'refBy': refBy};
          if(!$scope.$$phase) $scope.$apply();
          $scope.ref.child('users').child(uid).update($scope.userData);
          mkServices.refChain($scope.ref, uid, refChainfn);
        } else {
          var lastLoginDt = Firebase.ServerValue.TIMESTAMP;
          $scope.ref.child('users').child(uid).child('lastLoginDt').set(lastLoginDt);
          $scope.userData = snapshot.val();
          if(!$scope.$$phase) $scope.$apply();
          mkServices.refChain($scope.ref, uid, refChainfn);
        }//end if a
        
      });
    }, {
		  remember: "sessionOnly",
		  scope: "email"
		});//end authwithpopup
  };
  
  $scope.googleLogout = function() {
    $scope.ref.unauth();
    $scope.userData = null;	
    $scope.userDataReferred = null;
  };
  //login
  console.log($scope);
}])
;
