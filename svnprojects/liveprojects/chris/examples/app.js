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
.controller('mainController',['$scope', function($scope) {
    $scope.ref = new Firebase('https://cguo.firebaseio.com/examples');
    $scope.userData = null;
    
    $scope.googleLogin = function () {
        console.log('We are in login');
        $scope.ref.authWithOAuthPopup("google", function(error, authData) { //firebase api of google login
            if (error) {
                console.log('Login failed.');
                return;
            }
            //console.log(error);
            //console.log(authData);
            var uid = authData.uid;
            $scope.ref.child('users').child(uid).once("value", function(snapshot) {//read from firebase
                var a = snapshot.exists();
                if (!a) { // uid doesn't exist, create
                    console.log('created');
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
                    var lastLoginDt = Firebase.ServerValue.TIMESTAMP
                     // create a json object, and put it into firebase.
                    $scope.userData = {'uid': uid, 'id': id, 'email': email, 'name': displayName, 'img': profileImageURL, 'provider': provider, 'gender': gender, 'link': slink, 'lastName': family_name, 'firstName': given_name, 'createdAt': createdAt, 'lastLoginDt': lastLoginDt};
                    $scope.ref.child('users').child(uid).update($scope.userData);
                } else { // uid exists, we only update the last login date
                    console.log('updated');
                    var lastLoginDt = Firebase.ServerValue.TIMESTAMP;
                    $scope.ref.child('users').child(uid).child('lastLoginDt').set(lastLoginDt);
                }
            });
            

        },{scope:'email', remember:'sessionOnly'});  // this is how we make email available in authData
        //end authwithpopup
    };

    $scope.googleLogout = function () {
        console.log('We are in logout');
        $scope.ref.unauth();
        $scope.userData = null;
    };
    
    // callback function for both login and logout
    function authDataCallback(authData) {
        if (!authData) {
            console.log('user is logged out');
            $scope.userData = null;
            return;
        }
        $scope.ref.child('users').child(authData.uid).once("value", function(snapshot) {
            console.log(snapshot.val());
            $scope.userData = snapshot.val();
            if(!$scope.$$phase) $scope.$apply();
            console.log('userData:', $scope.userData);
        });
    };
    $scope.ref.onAuth(authDataCallback);

}]);

