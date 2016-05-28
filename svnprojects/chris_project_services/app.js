'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('mainController', ['$scope', function($scope) {
    $scope.ref = new Firebase('https://cguo.firebaseio.com/projectServices');
    $scope.userData = null;
                               
    //onAuth  
    function authDataCallback(authData) {
        console.log('authData', authData);
        if (authData) {
            console.log('User is logged in');
            $scope.ref.child('users').child(authData.uid).once('value', function(ret) {
                console.log('ret', ret);
                $scope.$apply(function() {
                    $scope.userData = ret.val();
                    console.log('userdata: ', $scope.userData);
                    //userdata:null  ???
                });
            });
        } else {
            console.log('User is logged out');
            $scope.userData = null;
        }
    }
    $scope.ref.onAuth(authDataCallback);
    
    $scope.googleLogin = function(){
        console.log('google login is here');
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
                
                $scope.userData = {
                    'uid': authData.uid,
                    'id': id,
                    'email': email,
                    'name': displayName,
                    'img': profileImageURL,
                    'provider': provider,
                    'gender': gender,
                    'link': slink,
                    'lastName': family_name,
                    'firstName': given_name,
                    'updatedAt': updatedAt
                };
                $scope.ref.child('users').child(authData.uid).update($scope.userData);
            }// end if
        }, {
            remember: "sessionOnly",
            scope: "email"
        });//end authwithpopup
    };// end google login
    
    $scope.googleLogout = function() {
        console.log('google logout is here');
        $scope.ref.unauth();
        $scope.userData = null;
    };
}])
;
