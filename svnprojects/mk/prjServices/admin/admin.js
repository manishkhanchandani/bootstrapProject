'use strict';

angular.module('myApp.admin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/main', {
    templateUrl: 'admin/admin.html',
    controller: 'AdminCtrl'
  }).when('/admin/new', {
    templateUrl: 'admin/new.html',
    controller: 'AdminNewCtrl'
  }).when('/all', {
    templateUrl: 'admin/all.html',
    controller: 'AdminAllCtrl'
  });
}])

.controller('AdminCtrl', ['$scope', function($scope) {

}])


.controller('AdminAllCtrl', ['$scope', 'mkServices', function($scope, mkServices) {
  
	//mycities
	$scope.mycities = null;
	$scope.allcities = function () {
			$scope.ref.child('ownedLocations').on("value", function(snapshotUser) {
				$scope.mycities = {};
        $scope.mycities.city = {};
        $scope.mycities.county = {};
        $scope.mycities.state = {};
        $scope.mycities.country = {};
				angular.forEach(snapshotUser.val(), function(value, key) {
          angular.forEach(value, function(value1, key1) {
            $scope.ref.child('locations').child(value1.location_id).once("value", function(snapshotLoc) {
              $scope.mycities[key][key1] = snapshotLoc.val();
              $scope.mycities[key][key1].owner_id = value1.owner_id;
              if(!$scope.$$phase) $scope.$apply();
            });
          });
				});
			});
	};
	
	//calling mycities
	$scope.allcities();
}])

.controller('AdminNewCtrl', ['$scope', 'mkServices', function($scope, mkServices) {
	$scope.error = {};
	$scope.mycities = null;
	$scope.data = null;
	$scope.details = {};
	$scope.mapOptions = {
      types: '(cities)'
    };
	
	//mycities
	$scope.mycities = function () {
		if ($scope.userData) {
			$scope.ref.child('users').child($scope.userData.uid).child('ownedLocations').on("value", function(snapshotUser) {
				$scope.mycities = {};
        $scope.mycities.city = {};
        $scope.mycities.county = {};
        $scope.mycities.state = {};
        $scope.mycities.country = {};
				angular.forEach(snapshotUser.val(), function(value, key) {
          angular.forEach(value, function(value1, key1) {
            $scope.ref.child('locations').child(value1).once("value", function(snapshotLoc) {
              $scope.mycities[key][key1] = snapshotLoc.val();
              if(!$scope.$$phase) $scope.$apply();
            });
          });
				});
			});
		}
	};
	
	//calling mycities
	$scope.mycities();
  
  function addCityConfirm() {
    $scope.ref.child('ownedLocations').child('city').child(btoa($scope.data.location)).once("value", function(snapshot) {
			  var a = snapshot.exists();
        if (a) {
          var ret = snapshot.val();
          if (ret.owner_id === $scope.userData.uid) {
              $scope.error.location = 'You are already a city manager of city ' + $scope.details.components.city;
              if(!$scope.$$phase) $scope.$apply();
              return;
          }
          
          $scope.error.location = 'Someone is already a manager of city ' + $scope.details.components.city;
          if(!$scope.$$phase) $scope.$apply();
          return;
        }
        
        if (!a) {
          var ret = {};
          ret.owner_id = $scope.userData.uid;
          ret.created_dt = Firebase.ServerValue.TIMESTAMP;
          ret.location_id = btoa($scope.data.location);
          $scope.ref.child('ownedLocations').child('city').child(btoa($scope.data.location)).update(ret);
          $scope.ref.child('users').child($scope.userData.uid).child('ownedLocations').child('city').child(btoa($scope.data.location)).set(btoa($scope.data.location));
					$scope.error.location = 'You are now city manager of city ' + $scope.details.components.city;
          if(!$scope.$$phase) $scope.$apply();
          return;
        }
    });
  }
  
  function addCountyConfirm() {
    $scope.ref.child('ownedLocations').child('county').child(btoa($scope.details.components.county + ', ' + $scope.details.components.state + ', ' + $scope.details.components.country)).once("value", function(snapshot) {
			  var a = snapshot.exists();
        if (a) {
          var ret = snapshot.val();
          if (ret.owner_id === $scope.userData.uid) {
              $scope.error.location = 'You are already a county manager of county ' + $scope.details.components.county;
              if(!$scope.$$phase) $scope.$apply();
              return;
          }
          
          $scope.error.location = 'Someone is already a manager of county ' + $scope.details.components.county;
          if(!$scope.$$phase) $scope.$apply();
          return;
        }
        
        if (!a) {
          var ret = {};
          ret.owner_id = $scope.userData.uid;
          ret.created_dt = Firebase.ServerValue.TIMESTAMP;
          ret.location_id = btoa($scope.data.location);
          $scope.ref.child('ownedLocations').child('county').child(btoa($scope.details.components.county + ', ' + $scope.details.components.state + ', ' + $scope.details.components.country)).update(ret);
          $scope.ref.child('users').child($scope.userData.uid).child('ownedLocations').child('county').child(btoa($scope.details.components.county + ', ' + $scope.details.components.state + ', ' + $scope.details.components.country)).set(btoa($scope.data.location));
					$scope.error.location = 'You are now county manager of county ' + $scope.details.components.county;
          if(!$scope.$$phase) $scope.$apply();
          return;
        }
    });
  }
  
  function addStateConfirm() {
    $scope.ref.child('ownedLocations').child('state').child(btoa($scope.details.components.state + ', ' + $scope.details.components.country)).once("value", function(snapshot) {
			  var a = snapshot.exists();
        if (a) {
          var ret = snapshot.val();
          if (ret.owner_id === $scope.userData.uid) {
              $scope.error.location = 'You are already a state manager of state ' + $scope.details.components.state;
              if(!$scope.$$phase) $scope.$apply();
              return;
          }
          
          $scope.error.location = 'Someone is already a manager of state ' + $scope.details.components.state;
          if(!$scope.$$phase) $scope.$apply();
          return;
        }
        
        if (!a) {
          var ret = {};
          ret.owner_id = $scope.userData.uid;
          ret.created_dt = Firebase.ServerValue.TIMESTAMP;
          ret.location_id = btoa($scope.data.location);
          $scope.ref.child('ownedLocations').child('state').child(btoa($scope.details.components.state + ', ' + $scope.details.components.country)).update(ret);
          $scope.ref.child('users').child($scope.userData.uid).child('ownedLocations').child('state').child(btoa($scope.details.components.state + ', ' + $scope.details.components.country)).set(btoa($scope.data.location));
					$scope.error.location = 'You are now state manager of state ' + $scope.details.components.state;
          if(!$scope.$$phase) $scope.$apply();
          return;
        }
    });
  }
  
  function addCountryConfirm() {
    $scope.ref.child('ownedLocations').child('country').child(btoa($scope.details.components.country)).once("value", function(snapshot) {
			  var a = snapshot.exists();
        if (a) {
          var ret = snapshot.val();
          if (ret.owner_id === $scope.userData.uid) {
              $scope.error.location = 'You are already a country manager of country ' + $scope.details.components.country;
              if(!$scope.$$phase) $scope.$apply();
              return;
          }
          
          $scope.error.location = 'Someone is already a manager of country ' + $scope.details.components.country;
          if(!$scope.$$phase) $scope.$apply();
          return;
        }
        
        if (!a) {
          var ret = {};
          ret.owner_id = $scope.userData.uid;
          ret.created_dt = Firebase.ServerValue.TIMESTAMP;
          ret.location_id = btoa($scope.data.location);
          $scope.ref.child('ownedLocations').child('country').child(btoa($scope.details.components.country)).update(ret);
          $scope.ref.child('users').child($scope.userData.uid).child('ownedLocations').child('country').child(btoa($scope.details.components.country)).set(btoa($scope.data.location));
					$scope.error.location = 'You are now country manager of country ' + $scope.details.components.country;
          if(!$scope.$$phase) $scope.$apply();
          return;
        }
    });
  }
	
	$scope.addCountry = function() {
      if (!$scope.data.location) {
        $scope.error.location = 'Please find location';
        return;
      }
		  if (!$scope.userData) {//if user is not logged in, dont allow him to add the city
			  $scope.error.location = 'Please login first to add the data';
			  return false;	
		  }
      mkServices.addLocation($scope.ref, $scope.data.location, $scope.details, addCountryConfirm);
      return;
  };
	
	$scope.addState = function() {
      if (!$scope.data.location) {
        $scope.error.location = 'Please find location';
        return;
      }
		  if (!$scope.userData) {//if user is not logged in, dont allow him to add the city
			  $scope.error.location = 'Please login first to add the data';
			  return false;	
		  }
      mkServices.addLocation($scope.ref, $scope.data.location, $scope.details, addStateConfirm);
      return;
  };
	
	$scope.addCounty = function() {
      if (!$scope.data.location) {
        $scope.error.location = 'Please find location';
        return;
      }
		  if (!$scope.userData) {//if user is not logged in, dont allow him to add the city
			  $scope.error.location = 'Please login first to add the data';
			  return false;	
		  }
      mkServices.addLocation($scope.ref, $scope.data.location, $scope.details, addCountyConfirm);
      return;
  };

	$scope.addCity = function() {
      if (!$scope.data.location) {
        $scope.error.location = 'Please find location';
        return;
      }
		  if (!$scope.userData) {//if user is not logged in, dont allow him to add the city
			  $scope.error.location = 'Please login first to add the data';
			  return false;	
		  }
      mkServices.addLocation($scope.ref, $scope.data.location, $scope.details, addCityConfirm);
      return;
		  //console.log	($scope.data);
		  //console.log($scope.details);
		  $scope.ref.child('locations').child(btoa($scope.data.autocomplete)).once("value", function(snapshot) {
			  var a = snapshot.exists();
			  //console.log('a exists: ', a);
			  if (!a) {
				  mkServices.addLocation($scope.ref, $scope.data.autocomplete, $scope.details, false);
				  if(!$scope.$$phase) {
					  $scope.$apply(function() {
						  $scope.error.city = 'Location added successfully';
						  $scope.details = {};
						  $scope.data.autocomplete = null;
						  
					  });
				  } else {
					  $scope.error.city = 'Location added successfully';
					  $scope.details = {};
					  $scope.data.autocomplete = null;
				  }
				  return;
			  }//end if (!a)
		  
			  var b = snapshot.child("owner_id").exists();
			  //console.log('b exists: ', b);
			  if (b) {
				  $scope.$apply(function() {
					  //console.log(snapshot.val().owner_id, ', ', $scope.userData.uid);
					  if (snapshot.val().owner_id === $scope.userData.uid) {//check if this city is bought by you or not
						  $scope.error.city = 'this city is already booked by you, please choose another city';
					  
					  } else {
						  $scope.error.city = 'this city is already booked by someone, please choose another city';
					  }
				  });
				  return;
			  } else {//this else may not be needed, so delete it if so
				  mkServices.addLocation($scope.ref, $scope.data.autocomplete, $scope.details, false);
				  
				  if(!$scope.$$phase) {
					  $scope.$apply(function() {
						  $scope.error.city = 'Location added successfully(2)';
						  $scope.details = {};
						  $scope.data.autocomplete = null;
						  
					  });
				  } else {
					  $scope.error.city = 'Location added successfully(2)';
					  $scope.details = {};
					  $scope.data.autocomplete = null;
				  }
				  return;
			  }//end if (b) 
		});//end $scope.ref.child('locations').child(btoa($scope.data.autocomplete))
	};//end $scope.addCity
}])
;