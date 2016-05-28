'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.admin'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'main/login.html',
    controller: 'mainCtrl'
  })
  .when('/logout', {
    templateUrl: 'main/login.html',
    controller: 'mainCtrl'
  })
  .otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
}])
.controller('mainCtrl', ['$scope', 'mkServices', '$location', '$log', '$rootScope', function($scope, mkServices, $location, $log, $rootScope) {
    $scope.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    $scope.ucwords = function (str) {
        //  discuss at: http://phpjs.org/functions/ucwords/
        // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // improved by: Waldo Malqui Silva
        // improved by: Robin
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Onno Marsman
        //    input by: James (http://www.james-bell.co.uk/)
        //   example 1: ucwords('kevin van  zonneveld');
        //   returns 1: 'Kevin Van  Zonneveld'
        //   example 2: ucwords('HELLO WORLD');
        //   returns 2: 'HELLO WORLD'

        return (str + '')
            .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
            return $1.toUpperCase();
        });
    }
    $scope.userData = null;
    $scope.userInfo = null;
    $scope.isLoggedIn = false;
    $scope.showAdmin = false;
    $scope.city = {};
    
    $scope.ref = mkServices.reference;
    $scope.refUsers = $scope.ref.child('users');
    $scope.refConfig = $scope.ref.child('config');
    
    $scope.auth = function (snapshot) {
        $scope.userInfo = snapshot.val();
        $scope.isLoggedIn = true;
        $scope.setAdmin($scope.isLoggedIn, $scope.admin_id, $scope.userInfo);
        //$log.debug('logged2 in user info is ', $scope.userInfo);     
    }
    
    $scope.authData = $scope.ref.getAuth();
    if ($scope.authData) {
        $scope.refUsers.child($scope.authData.google.id).once('value', function(snapshot) {
            $scope.$apply(function () {
                $scope.auth(snapshot);
            });
        });  
        
    }
    $scope.city.hostname = location.hostname;
    $scope.city.mainHost = (location.hostname).replace(/\.dcomerce\.com/g, '');
    $scope.city.mainHostUrl = btoa($scope.city.mainHost);
    $scope.setVars = function() {
        $scope.city.lat = $location.search().lat;
        $scope.city.lng = $location.search().lng;
        if (!$scope.city.lat) {
            window.location.href = 'http://dcomerce.com';  
            return; 
        }
        $scope.city.host = ($scope.city.mainHost).split('-');
        $scope.city.countryOriginal = $scope.city.host[0];
        $scope.city.stateOriginal = $scope.city.host[1];
        $scope.city.cityOriginal = $scope.city.host[2];
        $scope.city.cityData = ($scope.city.cityOriginal).split('_');
        $scope.city.city = ($scope.city.cityData).join(' ');
        $scope.city.cityNormal = $scope.ucwords($scope.city.city);
        $scope.city.stateNormal = $scope.city.stateOriginal.toUpperCase();
        $scope.city.countryNormal = $scope.city.countryOriginal.toUpperCase();
        $scope.currentCityRef = $scope.ref.child('cityDetails').child($scope.city.mainHost);
        
        $scope.city.projectName = $scope.city.cityNormal + ' ( ' + $scope.city.stateNormal + ', ' + $scope.city.countryNormal + ' )';
        $scope.currentCityRef.update({config: {url: $scope.city.hostname, city: $scope.city.cityNormal, state: $scope.city.stateNormal, country: $scope.city.countryNormal, projectName: $scope.city.projectName, lat: $scope.city.lat, lng: $scope.city.lng, id: $location.search().id, place_id: $location.search().place_id, place_url: $location.search().url}});
        $rootScope.$broadcast("showMapOnHomePage");
    }
    $scope.refConfig.child($scope.city.mainHostUrl).once('value', function(snapshot) {
        if (!snapshot.val()) {
            $scope.$apply(function() {
                $scope.refConfig.child($scope.city.mainHostUrl).set($scope.city.mainHost);
                $scope.setVars();
            });
            return false;
        }
        $scope.ref.child('cityDetails').child(snapshot.val()).child('config').once('value', function (snapshot2) {
            if (!snapshot2.val()) {
                $scope.$apply(function() {
                    $scope.setVars();
                });
            } else {
                $scope.$apply(function() {
                    var val = snapshot2.val();
                    $scope.city.cityNormal = val.city;
                    $scope.city.stateNormal = val.state;
                    $scope.city.countryNormal = val.country;
                    $scope.city.projectName = val.projectName;
                    $scope.city.admin_id = val.admin_id;
                    $scope.city.lat = val.lat;
                    $scope.city.lng = val.lng;
                    $scope.setAdmin($scope.isLoggedIn, $scope.city.admin_id, $scope.userInfo);
                    $rootScope.$broadcast("showMapOnHomePage");
                });
            }
        });
    });
    
    $scope.setAdmin = function(isLoggedIn, admin_id, user) {
        $scope.showAdmin = false;
        if (!isLoggedIn) return false;
        if (!admin_id) return false;
        if (!user.id) return false;
        if (typeof(admin_id) !== "undefined") {
            if (admin_id === user.id) {
                $scope.showAdmin = true;
            }
        }
    }
    
    $scope.ref.onAuth(function(authResponse) {
       if (authResponse) {
            $log.debug('authResponse: ', authResponse);
            $scope.refUsers.child(authResponse.google.id).once('value', function(snapshot) {
                $log.debug('snapshot: ', snapshot.val());
                $scope.auth(snapshot);
	  		});  
       } else {
            //$log.debug('user is logged out');
            $scope.userInfo = null;
            $scope.isLoggedIn = false;
       }
    });
    $scope.googleLogout = function() {
        $scope.ref.unauth();
        $location.path('/login');
    };//end google logout
    $scope.googleLogin = function() {
          $scope.ref.authWithOAuthPopup("google", function(error, authData) {
              $scope.$apply(function () {
                  if (error) {
                    $log.error("Login Failed!", error);
                  } else {
                    //$log.debug("Authenticated successfully with payload:", authData);
                    $scope.refUserId = $scope.refUsers.child(authData.google.id);
                    $scope.userInfo = {'id': authData.google.id, 'name': authData.google.displayName, 'img': authData.google.profileImageURL, 'provider': authData.provider, 'gender': authData.google.cachedUserProfile.gender, 'link': authData.google.cachedUserProfile.link};
                    $scope.refUserId.set($scope.userInfo);
                    $scope.isLoggedIn = true;
                  }
              });
        });
    };//end googlelogin
    if ($location.path() == "/logout") {
        $scope.googleLogout();
    }
    
    //console.log($scope);
}])
;
