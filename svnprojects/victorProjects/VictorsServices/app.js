(function() {
  'use strict';

	angular.module('myApp', [
		'ngRoute',
		'myApp.view1',
		'myApp.view2',
		'ngAutocomplete'
	]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/view1'});
	}])

	.controller('mainController', ['$scope', function($scope) {
		$scope.ref = new Firebase('https://victore07.firebaseio.com/iServe');
		$scope.userData = null;

		function authDataCallback(authData) {
			if (authData) {
				console.log("User is logged in");
				$scope.ref.child('users').child(authData.uid).once('value', function(ret) {
						$scope.$apply(function() {
							$scope.userData = ret.val();
						});
					});
			} else {
				console.log("User is logged out");
				$scope.userData = null;
			}
		}

		$scope.ref.onAuth(authDataCallback);

		$scope.googleLogin = function() {
			$scope.ref.authWithOAuthPopup("google", function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					var id = authData.google.id || '';
					var email = authData.google.cachedUserProfile.email || '';
					var displayName = authData.google.displayName || '';
					var profileImageURL = authData.google.profileImageURL || '';
					var provider = authData.provider || '';
					var gender = authData.google.cachedUserProfile.gender || '';
					var slink = authData.google.cachedUserProfile.link || '';
					var family_name = authData.google.cachedUserProfile.family_name || '';
					var given_name = authData.google.cachedUserProfile.given_name || '';
					var updatedAt = Firebase.ServerValue.TIMESTAMP;
					$scope.userData = {'uid': authData.uid, 'id': id, 'email': email, 'name': displayName, 'img': profileImageURL, 'provider': provider, 'gender': gender, 'link': slink, 'lastName': family_name, 'firstName': given_name, 'updatedAt': updatedAt};
					$scope.ref.child('users').child(authData.uid).update($scope.userData);
				}
			}, {
				remember: "sessionOnly",
				scope: "email"
			});
		};

		$scope.googleLogout = function() {
			$scope.ref.unauth();
					$scope.userData = null;	
		};
	}]);
})();