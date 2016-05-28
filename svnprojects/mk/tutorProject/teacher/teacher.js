'use strict';

angular.module('myApp.teacher', ['ngRoute', 'angularUtils.directives.dirPagination'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tutor', {
    templateUrl: 'teacher/teacher.html',
    controller: 'TeacherCtrl'
  })
  ///tutor/sl/mysql|php/us/ca/manteca/37.7974273/-121.21605260000001/Manteca%2C%20CA%2C%20United%20States
  .when('/tutor/:action/:subjects/:country/:state/:city/:lat/:lng/:loc', {
    templateUrl: 'teacher/teacher.html',
    controller: 'TeacherCtrl'
  })
  ///tutor/s/mysql|php
  .when('/tutor/:action/:subjects', {
    templateUrl: 'teacher/teacher.html',
    controller: 'TeacherCtrl'
  })
  ///tutor/l/us/ca/manteca/37.7974273/-121.21605260000001/Manteca%2C%20CA%2C%20United%20States
  .when('/tutor/:action/:country/:state/:city/:lat/:lng/:loc', {
    templateUrl: 'teacher/teacher.html',
    controller: 'TeacherCtrl'
  })
  .when('/TutorSignupStart', {
    templateUrl: 'teacher/signupstart.html',
    controller: 'TutorSignupStart'
  });
}])


.filter('ucwords', function() {
  return function(str) {
	  return (str + '')
		.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
		  return $1.toUpperCase();
		});
  };
})

.filter('daysAgo', function() {
  return function(date) {
		var seconds = Math.floor((new Date() - date) / 1000);
		
		var interval = Math.floor(seconds / 31536000);
		
		if (interval > 1) {
			return interval + " years ago";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months ago";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days ago";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours ago";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes ago";
		}
		return Math.floor(seconds) + " seconds ago";
  };
})

.controller('TeacherCtrl', ['$scope', 'mkServices', 'paginationService', '$routeParams', '$location', function($scope, mkServices, paginationService, $routeParams, $location) {
	console.log($routeParams);
	$scope.allSubjects = [];
	$scope.query = {};
	$scope.details = {};
	$scope.mapOptions = {
      types: '(cities)'
    };
	$scope.tutors = {};
	$scope.searchParam = '';
    $scope.currentPage = 1;
    $scope.pageSize = 2;
	
    $scope.pageChangeHandler = function(num) {
        console.log('groups page changed to ' + num);
    };

    $scope.changeFilter = function() {
        paginationService.setCurrentPage('__default', 1);
        $scope.currentPage = 1;
    };
	
	$scope.listMe = function (user) {
		$scope.ref.child('users').child(user).once('value', function(returnVar) {
			if(!$scope.$$phase) {
				$scope.$apply(function() {
					$scope.tutors[user] = returnVar.val();
				});
			} else {
				$scope.tutors[user] = returnVar.val();
			}//end if
		});//end $scope.ref.child('users')
	};
	
	$scope.startPage = function () {
		$scope.ref.child('users').orderByChild('tutor').startAt(true).endAt(true).on('value', function(childSnapshot) {
		angular.forEach(childSnapshot.val(), function(user, userKey) {
			$scope.listMe(userKey);
		});
	});//end child added
	};
	
	$scope.constructQuery = function () {
		if (!$scope.query.subject && !$scope.query.location) {
			$scope.startPage();
			return false;
		}
		
		var query = '/tutor';
		if ($scope.query.subject && $scope.query.location && $scope.query.subject.length > 0) {
			query = query + '/sl';
			query = query + '/' + $scope.query.subject.join('|');
			query = query
			+ '/' + encodeURIComponent($scope.details.components.country.toLowerCase())
			+ '/' + encodeURIComponent($scope.details.components.state.toLowerCase())
			+ '/' + encodeURIComponent($scope.details.components.city.toLowerCase())
			+ '/' + encodeURIComponent($scope.details.components.lat)
			+ '/' + encodeURIComponent($scope.details.components.lng)
			+ '/' + encodeURIComponent($scope.query.location)
			;
		} else if ($scope.query.subject && $scope.query.subject.length > 0) {
			query = query + '/s';
			query = query + '/' + $scope.query.subject.join('|');
		} else if ($scope.query.location) {
			query = query + '/l';
			query = query
			+ '/' + encodeURIComponent($scope.details.components.country.toLowerCase())
			+ '/' + encodeURIComponent($scope.details.components.state.toLowerCase())
			+ '/' + encodeURIComponent($scope.details.components.city.toLowerCase())
			+ '/' + encodeURIComponent($scope.details.components.lat)
			+ '/' + encodeURIComponent($scope.details.components.lng)
			+ '/' + encodeURIComponent($scope.query.location)
			;
		}
		console.log(query);
		$location.path(query);
	};

	$scope.findTutor = function () {
		if (!$scope.query.subject && !$scope.query.location) {
			$scope.startPage();
			return false;
		}
		/*
		if (!$scope.query.subject) {
			console.log('empty subject');
			return false;	
		}
		if (!$scope.query.location) {
			console.log('empty location');
			return false;	
		}*/
		$scope.tutors = {};
		
		$scope.showName = function(t) {
			var name = '';
			name = name + (t.userFirstName ? t.userFirstName : t.firstName);
			name = name + ' ' + (t.userLastName ? t.userLastName : t.lastName);
			console.log(t);
			return name;
		};

		if ($scope.query.location) {
			var country = $scope.details.components.country.toLowerCase();
			var state = $scope.details.components.state.toLowerCase();
			var city = $scope.details.components.city.toLowerCase();
			var lat = $scope.details.components.lat;
			var lng = $scope.details.components.lng;
		}
		
		if ($scope.query.subject && $scope.query.location) {
			console.log(1);
			angular.forEach($scope.query.subject, function(subject, subjectKey) {
				if (!subject) {
					return false;	
				}
				
				$scope.ref.child('statewise').child(btoa(country)).child(btoa(state)).child(btoa(subject)).on('child_added', function(childSnapshot) {
					$scope.listMe(childSnapshot.key());
				});//end child added
			});//end query subject foreach
			
			return false;
		}
		if ($scope.query.subject) {
			console.log($scope.query);
			console.log(2);
			angular.forEach($scope.query.subject, function(subject, subjectKey) {
				if (!subject) {
					return false;	
				}
				
				$scope.ref.child('subjects').child(btoa(subject)).on('child_added', function(childSnapshot) {
					$scope.listMe(childSnapshot.key());
				});//end child added
			});//end query subject foreach
			
			return false;
		}
		
		if ($scope.query.location) {
			console.log(3);
			
			$scope.ref.child('locations').child('statewise').child(btoa(country)).child(btoa(state)).on('child_added', function(childSnapshot) {
				$scope.listMe(childSnapshot.key());
			});//end child added
			
			return false;
		}
	};//end findTutor

	$scope.ref.child('allsubjects').on('child_added', function(childSnapshot) {
		if(!$scope.$$phase) {
			$scope.$apply(function() {
				$scope.allSubjects.push(childSnapshot.val());
			});
		} else {
			$scope.allSubjects.push(childSnapshot.val());
		}
	});//end child added
	
	if ($routeParams.action) {
		switch ($routeParams.action) {
			case 'sl':
				$scope.query.subject = $routeParams.subjects.split('|');
				$scope.details.components = {};
				$scope.details.components.country = decodeURIComponent($routeParams.country);
				$scope.details.components.state = decodeURIComponent($routeParams.state);
				$scope.details.components.city = decodeURIComponent($routeParams.city);
				$scope.details.components.lat = $routeParams.lat;
				$scope.details.components.lng = $routeParams.lng;
				$scope.query.location = decodeURIComponent($routeParams.loc);
				$scope.findTutor();
				break;
			case 'l':
				$scope.details.components = {};
				$scope.details.components.country = decodeURIComponent($routeParams.country);
				$scope.details.components.state = decodeURIComponent($routeParams.state);
				$scope.details.components.city = decodeURIComponent($routeParams.city);
				$scope.details.components.lat = $routeParams.lat;
				$scope.details.components.lng = $routeParams.lng;
				$scope.query.location = decodeURIComponent($routeParams.loc);
				$scope.findTutor();
				break;
			case 's':
				$scope.query.subject = $routeParams.subjects.split('|');
				$scope.findTutor();
				break;
			default:
				break;	
		}
	} else {
		$scope.startPage();
	}
}])

.controller('TutorSignupStart', ['$scope', 'mkServices', '$firebaseObject', '$location', function($scope, mkServices, $firebaseObject, $location) {
	$scope.newTutor = {};
	//console.log(mkServices.isUserLoggedIn());
	$scope.myCities = [];
	$scope.mySubjects = [];
	$scope.details = {};
	$scope.mapOptions = {
      types: '(cities)'
    };
	
	
	$scope.$watch(
		"userData",
		function handleFooChange( newValue, oldValue ) {
			if (!newValue || typeof(newValue) === 'undefined')
				return false;
			//console.log(newValue);
			$scope.newTutor.userFirstName = newValue.userFirstName ? newValue.userFirstName : newValue.firstName;
			$scope.newTutor.userLastName = newValue.userLastName ? newValue.userLastName : newValue.lastName;
			$scope.newTutor.email = newValue.email;
			$scope.newTutor.becomeTutor = newValue.tutor;
			if (newValue.phone)
				$scope.newTutor.phone = newValue.phone;
			if (newValue.description)
				$scope.newTutor.description = newValue.description;
			
			
			var bookingRef = $scope.refUsers.child(newValue.uid).child('bookings');
			var syncObject = $firebaseObject(bookingRef);
			// three way data binding
			syncObject.$bindTo($scope, 'days');
				
			
			$scope.refUsers.child(newValue.uid).child('location').on('value', function(childSnapshot) {
				if (!childSnapshot.val()) {
					return false;
				}
				
				$scope.ref.child('alllocations').child(childSnapshot.val()).once('value', function(childSnapshot2) {
					var record = childSnapshot2.val();
					$scope.myCities = [];
					if(!$scope.$$phase) {
						$scope.$apply(function() {
							$scope.myCities.push(record.location);
						});
					} else {
						$scope.myCities.push(record.location);
					}
				});//end child added
			});
				
			$scope.refUsers.child(newValue.uid).child('subjects').on('value', function(childSnapshot) {
				$scope.mySubjects = [];
				angular.forEach(childSnapshot.val(), function(subject, subjectKey) {
					if(!$scope.$$phase) {
						$scope.$apply(function() {
							$scope.mySubjects.push(subject);
						});
					} else {
						$scope.mySubjects.push(subject);
					}
				});
			});//end child added
		}
	);
	$scope.updateDetails = function () {
		$scope.refUsers.child($scope.userData.uid).child('phone').set($scope.newTutor.phone);
		$scope.refUsers.child($scope.userData.uid).child('description').set($scope.newTutor.description);
	};
	
	$scope.updateDetailsMain = function () {
		$scope.refUsers.child($scope.userData.uid).child('userFirstName').set($scope.newTutor.userFirstName);
		$scope.refUsers.child($scope.userData.uid).child('userLastName').set($scope.newTutor.userLastName);
		$scope.refUsers.child($scope.userData.uid).child('tutor').set($scope.newTutor.becomeTutor);
	};
	
    // function to set the default data
	$scope.reset = function() {
		var bookingRef = $scope.refUsers.child($scope.userData.uid).child('bookings');
		var slots = {
			  0: {
				time: '12:00am',
				booked: false
			  },
			  30: {
				time: '12:30am',
				booked: false
			  },
			  100: {
				time: '1:00am',
				booked: false
			  },
			  130: {
				time: '1:30am',
				booked: false
			  },
			  200: {
				time: '2:00am',
				booked: false
			  },
			  230: {
				time: '2:30am',
				booked: false
			  },
			  300: {
				time: '3:00am',
				booked: false
			  },
			  330: {
				time: '3:30am',
				booked: false
			  },
			  400: {
				time: '4:00am',
				booked: false
			  },
			  430: {
				time: '4:30am',
				booked: false
			  },
			  500: {
				time: '5:00am',
				booked: false
			  },
			  530: {
				time: '5:30am',
				booked: false
			  },
			  600: {
				time: '6:00am',
				booked: false
			  },
			  630: {
				time: '6:30am',
				booked: false
			  },
			  700: {
				time: '7:00am',
				booked: false
			  },
			  730: {
				time: '7:30am',
				booked: false
			  },
			  800: {
				time: '8:00am',
				booked: false
			  },
			  830: {
				time: '8:30am',
				booked: false
			  },
			  900: {
				time: '9:00am',
				booked: false
			  },
			  930: {
				time: '9:30am',
				booked: false
			  },
			  1000: {
				time: '10:00am',
				booked: false
			  },
			  1030: {
				time: '10:30am',
				booked: false
			  },
			  1100: {
				time: '11:00am',
				booked: false
			  },
			  1130: {
				time: '11:30am',
				booked: false
			  },
			  1200: {
				time: '12:00pm',
				booked: false
			  },
			  1230: {
				time: '12:30pm',
				booked: false
			  },
			  1300: {
				time: '1:00pm',
				booked: false
			  },
			  1330: {
				time: '1:30pm',
				booked: false
			  },
			  1400: {
				time: '2:00pm',
				booked: false
			  },
			  1430: {
				time: '2:30pm',
				booked: false
			  },
			  1500: {
				time: '3:00pm',
				booked: false
			  },
			  1530: {
				time: '3:30pm',
				booked: false
			  },
			  1600: {
				time: '4:00pm',
				booked: false
			  },
			  1630: {
				time: '4:30pm',
				booked: false
			  },
			  1700: {
				time: '5:00pm',
				booked: false
			  },
			  1730: {
				time: '5:30pm',
				booked: false
			  },
			  1800: {
				time: '6:00pm',
				booked: false
			  },
			  1830: {
				time: '6:30pm',
				booked: false
			  },
			  1900: {
				time: '7:00pm',
				booked: false
			  },
			  1930: {
				time: '7:30pm',
				booked: false
			  },
			  2000: {
				time: '8:00pm',
				booked: false
			  },
			  2030: {
				time: '8:30pm',
				booked: false
			  },
			  2100: {
				time: '9:00pm',
				booked: false
			  },
			  2130: {
				time: '9:30pm',
				booked: false
			  },
			  2200: {
				time: '10:00pm',
				booked: false
			  },
			  2230: {
				time: '10:30pm',
				booked: false
			  },
			  2300: {
				time: '11:00pm',
				booked: false
			  },
			  2330: {
				time: '11:30pm',
				booked: false
			  }
		};

		bookingRef.set({
		  0: {
			name: 'Sun',
			slots: slots
		  },
		  1: {
			name: 'Mon',
			slots: slots
		  },
		  2: {
			name: 'Tue',
			slots: slots
		  },
		  3: {
			name: 'Wed',
			slots: slots
		  },
		  4: {
			name: 'Thu',
			slots: slots
		  },
		  5: {
			name: 'Fri',
			slots: slots
		  },
		  6: {
			name: 'Sat',
			slots: slots
		  }
		});    
		
	};//reset
	
	
	$scope.updateAllCitiesAndSubjects = function() {
		$scope.ref.child('users').child($scope.userData.uid).once('value', function(ret) {
			var record = ret.val();
			if (record.location && record.subjects) {
				$scope.refUsers.child($scope.userData.uid).child('tutor').set(true);
				var key = record.location;
				$scope.ref.child('alllocations').child(key).once('value', function(locs) {
					var locResult = locs.val();
					var country = locResult.country;
					var state = locResult.state;
					var city = locResult.city;
					angular.forEach(record.subjects, function(subject, subjectKey) {
						$scope.ref.child('citywise').child(btoa(country)).child(btoa(state)).child(btoa(city)).child(btoa(subject)).child($scope.userData.uid).set(true);
						$scope.ref.child('statewise').child(btoa(country)).child(btoa(state)).child(btoa(subject)).child($scope.userData.uid).set(true);
						$scope.ref.child('countrywise').child(btoa(country)).child(btoa(subject)).child($scope.userData.uid).set(true);
					});//end angular.forEach(record.subjects);
				});//end $scope.ref.child('alllocations');
			} else {
				$scope.refUsers.child($scope.userData.uid).child('tutor').set(true);	
			}
		});
	}//end $scope.updateAllCitiesAndSubjects
	$scope.addSubject = function () {
		var updatedAt = Firebase.ServerValue.TIMESTAMP;
		$scope.refUsers.child($scope.userData.uid).child('updatedAt').set(updatedAt);
		var subject = $scope.newTutor.subject.toLowerCase();
		$scope.refUsers.child($scope.userData.uid).child('subjects').child(btoa(subject)).set(subject);
		$scope.ref.child('allsubjects').child(btoa(subject)).set(subject);
		$scope.ref.child('subjects').child(btoa(subject)).child($scope.userData.uid).set(true);
		$scope.newTutor.subject = null;
		$scope.updateAllCitiesAndSubjects();
	}//end $scope.addSubject

	$scope.addCity = function() {
		var updatedAt = Firebase.ServerValue.TIMESTAMP;
		$scope.refUsers.child($scope.userData.uid).child('updatedAt').set(updatedAt);
		var loc = $scope.autocomplete;
		var country = $scope.details.components.country.toLowerCase();
		var state = $scope.details.components.state.toLowerCase();
		var city = $scope.details.components.city.toLowerCase(); 
		$scope.refUsers.child($scope.userData.uid).child('location').set(btoa(loc));
		$scope.ref.child('alllocations').child(btoa(loc)).child('location').set(loc);
		$scope.ref.child('alllocations').child(btoa(loc)).child('country').set(country);
		$scope.ref.child('alllocations').child(btoa(loc)).child('state').set(state);
		$scope.ref.child('alllocations').child(btoa(loc)).child('city').set(city);
		$scope.ref.child('alllocations').child(btoa(loc)).child('lat').set($scope.details.components.lat);
		$scope.ref.child('alllocations').child(btoa(loc)).child('lng').set($scope.details.components.lng);
		$scope.refLocations.child('citywise').child(btoa(country)).child(btoa(state)).child(btoa(city)).child($scope.userData.uid).set(true);
		$scope.refLocations.child('statewise').child(btoa(country)).child(btoa(state)).child($scope.userData.uid).set(true);
		$scope.refLocations.child('countrywise').child(btoa(country)).child($scope.userData.uid).set(true);
		$scope.autocomplete = null;
		$scope.updateAllCitiesAndSubjects();
	};//end $scope.addCity
	
	$scope.updateTutorFlag = function () {
		
	};
	

}])
;