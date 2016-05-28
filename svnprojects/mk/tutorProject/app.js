'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.students',
  'myApp.teacher',
  'ngAutocomplete',
  'angular-toArrayFilter',
  'firebase'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])


.controller('mainController', ['$scope', 'mkServices', '$location', function($scope, mkServices, $location) {
	$scope.ref = mkServices.reference;
    $scope.refUsers = $scope.ref.child('users');
    $scope.refLocations = $scope.ref.child('locations');
	$scope.userData = null;

	
	$scope.checkPage = function(page, isLoggedIn) {
		var loggedInPages = ['/TutorSignupStart'];
		for (var x in loggedInPages) {
			var checkPage = loggedInPages[x];
			if (checkPage === page && !isLoggedIn) {
				$location.path('/');
			}
		}
	};
	//onAuth
	function authDataCallback(authData) {
		console.log('authdata', authData);
	  if (authData) {
		$scope.ref.child('users').child(authData.uid).once('value', function(ret) {
                $scope.$apply(function() {
                    $scope.userData = ret.val();
                    //console.log('userdata: ', $scope.userData);
					$scope.checkPage($location.path(), true);
                });
            });
	  } else {
		console.log("User is logged out");
		$scope.userData = null;
		$scope.checkPage($location.path(), false);
	  }
	}
	// Register the callback to be fired every time auth state change
	$scope.ref.onAuth(authDataCallback);
	//onAuth Ends

	//Google Logout
    $scope.googleLogout = function() {
        $scope.ref.unauth();
        $scope.userData = null;
    };//end google logout
	
	//Google Login
    $scope.googleLogin = function() {
          $scope.ref.authWithOAuthPopup("google", function(error, authData) {
              if (error) {
				console.log("Login Failed!", error);
			  } else {
				//console.log("Authenticated successfully with payload:", authData);
				var refUserId = $scope.refUsers.child(authData.uid);
				var id = authData.google.id || '';
				var email = authData.google.email || '';
				var displayName = authData.google.displayName || '';
				var profileImageURL = authData.google.profileImageURL || '';
				var provider = authData.provider || '';
				var gender = authData.google.cachedUserProfile.gender || '';
				var slink = authData.google.cachedUserProfile.link || '';
				var family_name = authData.google.cachedUserProfile.family_name || '';
				var given_name = authData.google.cachedUserProfile.given_name || '';
				var updatedAt = Firebase.ServerValue.TIMESTAMP;
				$scope.userData = {'uid': authData.uid, 'id': id, 'email': email, 'name': displayName, 'img': profileImageURL, 'provider': provider, 'gender': gender, 'link': slink, 'lastName': family_name, 'firstName': given_name, 'updatedAt': updatedAt};
				refUserId.update($scope.userData);
				//console.log('user data is set successfully');
			  }
        }, {
		  remember: "sessionOnly",
		  scope: "email"
		});
    };//end googlelogin
	
}])
;
