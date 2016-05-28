angular.module('myApp').service('mkServices', ['$http', function($http) {

  this.refChainList = [];
  this.refDefaultUser = 'google:112913147917981568678';
  
  this.refChain = function(ref, uid, callback) {
    var chain = [];
    var referrer = null;
    var s = null;
    var defaultUser = this.refDefaultUser;
    //first link
    ref.child('users').child(uid).once("value", function(snapshot) {
      s = snapshot.val();
      referrer = s.refBy || defaultUser;
      if (referrer) {
        chain[0] = referrer;
        console.log('level 1: ', referrer);
        //second link
        ref.child('users').child(referrer).once("value", function(snapshot) {
          s = snapshot.val();
          referrer = s.refBy || defaultUser;
          if (referrer) {
            chain[1] = referrer;
            console.log('level 2: ', referrer);
            //third link
            ref.child('users').child(referrer).once("value", function(snapshot) {
              s = snapshot.val();
              referrer = s.refBy || defaultUser;
              if (referrer) {
                chain[2] = referrer;
                console.log('level 3: ', referrer);
                //fourth link
                ref.child('users').child(referrer).once("value", function(snapshot) {
                  s = snapshot.val();
                  referrer = s.refBy || defaultUser;
                  if (referrer) {
                    chain[3] = referrer;
                    console.log('level 4: ', referrer);
                    callback(chain);
                  }
                });
                //fourth link ends
              }
            });
            //third link ends
          }
        });
        //second link ends
      }//end if referrer
    });
    //first link ends
  };

  this.ip = function(callback) {
    var url = 'api/iptocityipinfo_io.php';
    $http({
      method: 'GET',
      url: url
    }).then(function successCallback(response) {
        callback(response);
      }, function errorCallback(response) {
        console.log('error call back');
        console.log(response);
      });
  };

  this.ip_old = function(callback) {
    var url = 'api/iptocity.php';
    $http({
      method: 'GET',
      url: url
    }).then(function successCallback(response) {
        callback(response);
      }, function errorCallback(response) {
        console.log('error call back');
        console.log(response);
      });
  };

	this.services = function() {
		return {
			automotive: {name: 'Automotive', key: 'automotive'},
			beauty: {name: 'Beauty', key: 'beauty'},
			computer: {name: 'Computer', key: 'computer'},
			creative: {name: 'Creative', key: 'creative'},
			cycle: {name: 'Cycle', key: 'cycle'},
			events: {name: 'Event', key: 'events'},
			farm_garden: {name: 'Farm & Garden', key: 'farm_garden'},
			financial: {name: 'Financial', key: 'financial'},
			household: {name: 'Household', key: 'household'},
			labor_move: {name: 'Labor / Move', key: 'labor_move'},
			legal: {name: 'Legal', key: 'legal'},
			lessons: {name: 'Lessons', key: 'lessons'},
			marine: {name: 'Marine', key: 'marine'},
			pet: {name: 'Pet', key: 'pet'},
			realestate: {name: 'Real Estate', key: 'realestate'},
			skilledtrade: {name: 'Skilled Trade', key: 'skilledtrade'},
			smallbusinessads: {name: 'Small Business Ads', key: 'smallbusinessads'},
			therapeutic: {name: 'Therapeutic', key: 'therapeutic'},
			travel_vacation: {name: 'Travel / Vacation', key: 'travel_vacation'},
			writingeditingtranslation: {name: 'Writing / Editing / Translation', key: 'writingeditingtranslation'}
		}
	};

    this.distance = function(lat1, lon1, lat2, lon2, unit)
	{
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    };

  this.tracking = function(ref, content) {
    ref.child('tracking').push(content);
  }

	this.addLocation = function(ref, location, details, callback)
	{
		var det = {};
		det.city = details.components.city;
		det.state = details.components.state;
		det.country = details.components.country;
		det.lat = details.components.lat;
		det.lng = details.components.lng;
		det.county = details.components.county;
		det.location = location;
		det.place_id = details.place_id;
		ref.child('locations').child(btoa(location)).update(det);
		if (callback) {
			callback();	
		}
		
	};
	
	
	
	this.queryLevel1 = function(primaryRef, secondaryRef, mainRef, callback) {
		primaryRef.on('child_added', function(childSnapshot) { 
            //console.log('key is: ', childSnapshot.key());
            secondaryRef.child(childSnapshot.key()).once('value', function(returnVar) {
				//console.log('listing details: ', returnVar.val());
				var ret = returnVar.val();
				ret.key = returnVar.key();
				mainRef.child('users').child(ret.owner_id).once('value', function(usersVar) {
					//console.log('users details: ', usersVar.val());
					var ui = usersVar.val();
					ret.userInfo = {firstName: ui.firstName};
					//console.log('ret: ', ret);
					callback(ret);
				});
            });
        });
		
	};//end queryLevel1
	
	
	
	this.queryLevel2 = function(primaryRef, secondaryRef, mainRef, callback) {
		primaryRef.on('child_added', function(childSnapshot) { 
            //console.log('key is: ', childSnapshot.key());
			primaryRef.child(childSnapshot.key()).on('value', function (ret) {
				//console.log('v: ', ret.val());
				angular.forEach(ret.val(), function(value, key) {
					//console.log('k is ', key, ' and v is ', value);
					secondaryRef.child(key).once('value', function(returnVar) {
						//console.log('res is ', returnVar.val());
						var ret = returnVar.val();
						ret.key = returnVar.key();
						mainRef.child('users').child(ret.owner_id).once('value', function(usersVar) {
							var ui = usersVar.val();
							ret.userInfo = {firstName: ui.firstName};
							//console.log(ret);
							callback(ret);
						});
					});
				});
			});
        });
	};//end queryLevel1
	
	this.cityWise = function(mainRef, $firebaseObject, keyword, keyword2, country, state, city, cat, callback) {
		var ref = mainRef.child(keyword).child('citywise').child(btoa(country)).child(btoa(state)).child(btoa(city)).child(btoa(cat));
		var obj = $firebaseObject(ref);
		obj.$watch(function() {
			angular.forEach(obj, function(value, key) {
				mainRef.child(keyword2).child(key).once('value', function(returnVar) {
					callback(returnVar);
				});
			});
		});
	};//end this.cityWise
	
	this.stateWise = function(mainRef, $firebaseObject, keyword, keyword2, country, state, cat, callback) {
		var ref = mainRef.child(keyword).child('statewise').child(btoa(country)).child(btoa(state)).child(btoa(cat));
		var obj = $firebaseObject(ref);
		obj.$watch(function() {
			angular.forEach(obj, function(value, key) {
				mainRef.child(keyword2).child(key).once('value', function(returnVar) {
					callback(returnVar);
				});
			});
		});
	};//end this.stateWise
	
	this.countyWise = function(mainRef, $firebaseObject, keyword, keyword2, country, state, county, cat, callback) {
		var ref = mainRef.child(keyword).child('countywise').child(btoa(country)).child(btoa(state)).child(btoa(county)).child(btoa(cat));
		var obj = $firebaseObject(ref);
		obj.$watch(function() {
			angular.forEach(obj, function(value, key) {
				mainRef.child(keyword2).child(key).once('value', function(returnVar) {
					callback(returnVar);
				});
			});
		});
	};//end this.countyWise
	
	this.countryWise = function(mainRef, $firebaseObject, keyword, keyword2, country, cat, callback) {
		var ref = mainRef.child(keyword).child('countrywise').child(btoa(country)).child(btoa(cat));
		var obj = $firebaseObject(ref);
		obj.$watch(function() {
			angular.forEach(obj, function(value, key) {
				mainRef.child(keyword2).child(key).once('value', function(returnVar) {
					callback(returnVar);
				});
			});
		});
	};//end this.countryWise
	
	this.cityWiseNoCat = function(mainRef, $firebaseObject, keyword, keyword2, country, state, city, callback) {
		var ref = mainRef.child(keyword).child('citywise').child(btoa(country)).child(btoa(state)).child(btoa(city));
		var obj = $firebaseObject(ref);
		obj.$watch(function() {
			angular.forEach(obj, function(value, key) {
				angular.forEach(value, function(value2, key2) {
					mainRef.child(keyword2).child(key2).once('value', function(returnVar) {
						callback(returnVar);
					});
				});
			});
		});
	};//end this.cityWiseNoCat 
	
	this.stateWiseNoCat = function(mainRef, $firebaseObject, keyword, keyword2, country, state, callback) {
		var ref = mainRef.child(keyword).child('statewise').child(btoa(country)).child(btoa(state));
		var obj = $firebaseObject(ref);
		obj.$watch(function() {
			angular.forEach(obj, function(value, key) {
				angular.forEach(value, function(value2, key2) {
					mainRef.child(keyword2).child(key2).once('value', function(returnVar) {
						callback(returnVar);
					});
				});
			});
		});
	};//end this.stateWiseNoCat 
	
	this.countyWiseNoCat = function(mainRef, $firebaseObject, keyword, keyword2, country, state, county, callback) {
		var ref = mainRef.child(keyword).child('countywise').child(btoa(country)).child(btoa(state)).child(btoa(county));
		var obj = $firebaseObject(ref);
		obj.$watch(function() {
			angular.forEach(obj, function(value, key) {
				angular.forEach(value, function(value2, key2) {
					mainRef.child(keyword2).child(key2).once('value', function(returnVar) {
						callback(returnVar);
					});
				});
			});
		});
	};//end this.countyWiseNoCat 
	
	this.countryWiseNoCat = function(mainRef, $firebaseObject, keyword, keyword2, country, callback) {
		var ref = mainRef.child(keyword).child('countrywise').child(btoa(country));
		var obj = $firebaseObject(ref);
		obj.$watch(function() {
			angular.forEach(obj, function(value, key) {
				angular.forEach(value, function(value2, key2) {
					mainRef.child(keyword2).child(key2).once('value', function(returnVar) {
						callback(returnVar);
					});
				});
			});
		});
	};//end this.countryWiseNoCat
	
	
	
	this.tracking = function(mainRef, action, data, loc) {
		var trackingRef = mainRef.child('tracking');
	    data['date'] = Firebase.ServerValue.TIMESTAMP;
		switch (action) {
			case 'userLocation':
				var pushRef = trackingRef.child('userLocation').push(data);
				var id = pushRef.key();
				mainRef.child('trackingLocation').child('userLocation').child('citywise').child(btoa(loc.country)).child(btoa(loc.state)).child(btoa(loc.city)).child(id).set(true);
				mainRef.child('trackingLocation').child('userLocation').child('statewise').child(btoa(loc.country)).child(btoa(loc.state)).child(id).set(true);
				mainRef.child('trackingLocation').child('userLocation').child('countrywise').child(btoa(loc.country)).child(id).set(true);
				mainRef.child('trackingLocation').child('userLocation').child('countywise').child(btoa(loc.country)).child(btoa(loc.state)).child(btoa(loc.county)).child(id).set(true);
				break;	
		}
	};

}]);