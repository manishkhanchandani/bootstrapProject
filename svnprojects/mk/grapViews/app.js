'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'firebase'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
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

.controller('mainController', ['$scope', function($scope) {
  $scope.ref = new Firebase('https://mycontacts12.firebaseio.com/grabViews');
  $scope.userData = null;
  
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
          $scope.userData = {'uid': uid, 'id': id, 'email': email, 'name': displayName, 'img': profileImageURL, 'provider': provider, 'gender': gender, 'link': slink, 'lastName': family_name, 'firstName': given_name, 'createdAt': createdAt, 'lastLoginDt': lastLoginDt, 'accessLevel': 'member'};
          $scope.ref.child('users').child(uid).update($scope.userData);
        } else {
          var lastLoginDt = Firebase.ServerValue.TIMESTAMP;
          $scope.ref.child('users').child(uid).child('lastLoginDt').set(lastLoginDt);
        }//end if a
        if(!$scope.$$phase) $scope.$apply();
      });
    }, {
		  remember: "sessionOnly",
		  scope: "email"
		});//end authwithpopup
  };
  
  $scope.googleLogout = function() {
    $scope.ref.unauth();
    $scope.userData = null;	
  };
  function authDataCallback(authData) {
    if (!authData) {
      console.log('user is logged out');
      $scope.userData = null;
      return;
    }
    $scope.ref.child('users').child(authData.uid).once("value", function(snapshot) {
      if (snapshot.exists()) {
        $scope.userData = snapshot.val();
        if(!$scope.$$phase) $scope.$apply();
        console.log($scope.userData);
      }
    });
  };
  $scope.ref.onAuth(authDataCallback);
  
}])
;


