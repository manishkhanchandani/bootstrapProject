'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'firebase'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/new'});
}])
.controller('mainController', ['$scope', '$location', function($scope, $location) {
	$scope.ref = new Firebase('https://radiant-inferno-4789.firebaseio.com');
	$scope.userData = null;
	
	$scope.googleLogin = function() {
		//console.log('Login');
		
		$scope.ref.authWithOAuthPopup("google", function(error, authData) {
			if (error) {
				console.log("Logih Failed", error);
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
					$scope.userData = {'uid': uid, 'id': id, 'email': email, 'name': displayName, 'img': profileImageURL, 'provider': provider, 'gender': gender, 'link': slink, 'lastName': family_name, 'firstName': given_name, 'createdAt': createdAt, 'lastLoginDt': lastLoginDt};
       
					$scope.ref.child('users').child(uid).update($scope.userData);	
				}
				else {
					var lastLoginDt = Firebase.ServerValue.TIMESTAMP;
					$scope.ref.child('users').child(uid).child('lastLoginDt').update(lastLoginDt);
				}
			});
		}, {scope: 'email', remember: 'sessionOnly'});	
	};	
	
	function authDataCallback(authData) {
			if (!authData) {
				console.log('user is logged out');
				$scope.userData = null;
				return;
			}
			console.log('user is logged in');
			$scope.ref.child('users').child(authData.uid).once("value", function(snapshot) {
				console.log(snapshot.val());
				$scope.userData = snapshot.val();
		   
				if(!$scope.$$phase) $scope.$apply();

			});   
	   
	};
	
	$scope.ref.onAuth(authDataCallback);
	
	$scope.googleLogout = function() {
		console.log('Logout');
		$scope.ref.unauth();
		$scope.userData = null;
		$location.path('new');
	};
	
}])
;
