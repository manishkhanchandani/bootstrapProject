'use strict';

angular.module('myApp.main', ['ngRoute', 'ngAutocomplete', 'firebase', 'angularUtils.directives.dirPagination'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'main/home.html',
    controller: 'HomeCtrl'
  })
  .when('/login', {
    templateUrl: 'main/login.html',
    controller: 'LoginCtrl'
  })
  .when('/detail/:groupID', {
    templateUrl: 'main/detail.html',
    controller: 'DetailCtrl'
  })
  .when('/start', {
    templateUrl: 'main/start.html',
    controller: 'StartCtrl'
  })
  .when('/find', {
    templateUrl: 'main/find.html',
    controller: 'FindCtrl'
  })
  .when('/find/:country/:state/:city/:keyword/:page/:area/:lat/:lng', {
    templateUrl: 'main/find.html',
    controller: 'FindCtrl'
  })///find/US/CA/Manteca/php/1/2/37.7974273/-121.21605260000001
  .when('/find/:kw/:page', {
    templateUrl: 'main/find.html',
    controller: 'FindCtrl'
  })///find/kizomba/1
  
        //console.log('/find/'+loc.country+'/'+loc.state+'/'+'/'+loc.city+'/'+q+'/'+$scope.currentPage+'/'+area+'/'+loc.lat+'/'+loc.lng);
  
  ;
}])

.controller('HomeCtrl', ['$scope', function($scope) {

}])

.controller('DetailCtrl', ['$scope', '$log', '$routeParams', '$location', '$timeout', 'mkServices', function($scope,$log, $routeParams, $location, $timeout, mkServices) {
    console.log($routeParams);
}])

.controller('LoginCtrl', ['$scope', 'mkServices', 'localStorageService', '$location', function($scope, mkServices, localStorageService, $location) {
    /*var mainRef = mkServices.reference;
    mainRef.unauth();
    var authData = mainRef.getAuth();
    console.log('authdata: ', authData);
    var currentUser = mkServices.currentUser();
    console.log('current user');
    console.log(currentUser);*/
    var mainRef = mkServices.reference;
    if ($location.path() == "/logout") {
        $scope.googleLogout();
    }
}])

.controller('StartCtrl', ['$scope', '$firebaseArray', '$log', function($scope, $firebaseArray, $log) {
    var groupKey = 'groups';
    var groupRef = $scope.mainRef.child(groupKey).child('groups');
    var keywordsRef = $scope.mainRef.child(groupKey).child('keywords');
    var userGroupsRef = $scope.mainRef.child(groupKey).child('userGroups');
    var groupUsersRef = $scope.mainRef.child(groupKey).child('groupUsers');
    var locationsRef = $scope.mainRef.child(groupKey).child('locations');
    $scope.groupFirebaseArray = $firebaseArray(groupRef);
    $scope.result = '';
    $scope.details = '';
    $scope.options = {
        types: '(cities)'
    };
    
    $scope.allTopics = [];
    $scope.tmpData = {};
    $scope.tmpData.memberName = 'Members';
    $scope.locData = {};
    $scope.addTopic = function () {
        if (!$scope.tmpData.topics) {
            return false;    
        }
        $scope.allTopics.push($scope.tmpData.topics);
        $scope.tmpData.topics = '';
    };
    $scope.addTopicEnter = function(keyEvent) {
      if (keyEvent.which === 13) {
        $scope.addTopic();
      }
    };
    $scope.submitGroup = function() {
        //validation
        if (!$scope.userData) {
            $log.error('not logged in');
            return false;   
        }
        if (!$scope.details.components) {
            $log.error('empty components');
            return;
        }
        if (!$scope.tmpData.name) {
            $log.error('empty name');
            return;
        }
        $scope.locData = {};
        $scope.locData.location = {};
        $scope.locData.location.city = $scope.details.components.city;
        $scope.locData.location.state = $scope.details.components.state;
        $scope.locData.location.country = $scope.details.components.country;
        $scope.locData.location.lat = $scope.details.components.lat;
        $scope.locData.location.lng = $scope.details.components.lng;
        $scope.locData.topics = $scope.allTopics;
        $scope.locData.name = $scope.tmpData.name ? $scope.tmpData.name : null;
        $scope.locData.memberName = $scope.tmpData.memberName ? $scope.tmpData.memberName : null;
        $scope.locData.description = $scope.tmpData.description ? $scope.tmpData.description : null;
        $scope.locData.createdAt = Firebase.ServerValue.TIMESTAMP;
        $scope.locData.createdBy = $scope.userData.id;
        $scope.locData.imageURL = $scope.tmpData.imageURL ? $scope.tmpData.imageURL : null;
        $scope.groupFirebaseArray.$add($scope.locData).then(function(returnVar) {
            var id = returnVar.key();
            groupRef.child(id).update({groupId: id});
            $scope.message = 'Group added successfully with ID ' + id;
            //adding group for each topics
            if ($scope.allTopics.length > 0) {
                for (var i = 0; i < $scope.allTopics.length; i++) {
                    var keyword = btoa($scope.allTopics[i].toLowerCase());
                    /*keywordsRef.child(keyword).child('meta').child('name').set($scope.allTopics[i].toLowerCase());
                    keywordsRef.child(keyword).child('groups').child(id).set(true);*/
                    //locations come here
                    keywordsRef.child($scope.allTopics[i].toLowerCase()).child(id).set(true);
                    locationsRef.child('citywise').child($scope.locData.location.country).child($scope.locData.location.state).child($scope.locData.location.city).child(keyword).child(id).set(true);
                    locationsRef.child('statewise').child($scope.locData.location.country).child($scope.locData.location.state).child(keyword).child(id).set(true);
                    locationsRef.child('countrywise').child($scope.locData.location.country).child(keyword).child(id).set(true);
                }
            }
            //adding group for each user
            userGroupsRef.child($scope.userData.id).child(id).set(true);
            //adding user for each group
            groupUsersRef.child(id).child($scope.userData.id).set({organizer: true, coorganizer: false, associateorganizer: false, eventorganizer: false, member: true});
            //more to come here
            $scope.locData = null;
            $scope.tmpData = {};
            $scope.tmpData.memberName = 'Members';
            $scope.allTopics = [];
        });
    };
    
}])


.controller('FindCtrl', ['$scope', '$firebaseArray', '$log', '$routeParams', '$location', '$timeout', 'paginationService', 'mkServices', function($scope, $firebaseArray, $log, $routeParams, $location, $timeout, paginationService, mkServices) {
    /*
    $scope.distance = function (lat1, lon1, lat2, lon2, unit) {
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
    };*/

    $scope.areaOptions = [
        {
          name: 'search within city',
          value: '1'
        }, 
        {
          name: 'search within state',
          value: '2'
        }, 
        {
          name: 'search within country',
          value: '3'
        }, 
        {
          name: 'search all over world',
          value: '4'
        }
    ];

    $scope.area = ($routeParams.area) ? $routeParams.area : $scope.areaOptions[1].value;
    $scope.showLoadingIcon = true;

    var groupKey = 'groups';
    var groupRef = $scope.mainRef.child(groupKey).child('groups');
    var keywordsRef = $scope.mainRef.child(groupKey).child('keywords');
    var userGroupsRef = $scope.mainRef.child(groupKey).child('userGroups');
    var groupUsersRef = $scope.mainRef.child(groupKey).child('groupUsers');
    var locationsRef = $scope.mainRef.child(groupKey).child('locations');
    //$scope.myGroupFirebaseArray = $firebaseArray(groupRef);
    $scope.myGroupFirebaseArray = [];
    
    $scope.currentPage = ($routeParams.page) ? $routeParams.page : 1;
    $scope.pageSize = 2;
    $scope.pageChangeHandler = function(num) {
        //console.log('groups page changed to ' + num);
        console.log('route param: ', $routeParams);
    };
    
    $scope.goToDetail = function (list) {
        console.log('/detail/' + (list.groupId));
        $location.path('/detail/' + (list.groupId));  
    };
    
    $scope.findUrl = function(q, loc, area, page) {
//console.log('/find/'+loc.country+'/'+loc.state+'/'+loc.city+'/'+q+'/'+$scope.currentPage+'/'+area+'/'+loc.lat+'/'+loc.lng);        
        $location.path('/find/'+loc.country+'/'+loc.state+'/'+loc.city+'/'+q+'/'+page+'/'+area+'/'+loc.lat+'/'+loc.lng);
    };

    /*
    $scope.list = function(returnVar, loc) {
        var rec = returnVar.val();
        rec.distance = -1;
        if (loc) {
            rec.distance = $scope.distance(loc.lat, loc.lng, rec.location.lat, rec.location.lng, "M");
        }
        if (!rec.imageURL) rec.imageURL = 'http://webnoh.alsa.org/images/content/pagebuilder/192082.jpg';
        $scope.myGroupFirebaseArray.push(rec);
    };
    */

    $scope.changeFilter = function() {
        paginationService.setCurrentPage('__default', 1);
        $scope.currentPage = 1;
    };
    
    $scope.findResult = function(q, loc, area) {
        //console.log('/find/'+q+'/'+$scope.currentPage+'/'+area+'/'+loc.city+'/'+loc.state+'/'+loc.country+'/'+loc.lat+'/'+loc.lng);
        //console.log('/find/'+loc.country+'/'+loc.state+'/'+'/'+loc.city+'/'+q+'/'+$scope.currentPage+'/'+area+'/'+loc.lat+'/'+loc.lng);
        $scope.details = {};
        $scope.area = area;
        $scope.searchQuery = q;
        $scope.details.components = loc;
        $scope.autocomplete = loc.city + ', ' + loc.state + ', ' + loc.country;
        $scope.myGroupFirebaseArray = [];
        var keyword = btoa(q);
        var messageListRef = null;
        if (area == 2) {
            messageListRef = locationsRef.child('statewise').child(loc.country).child(loc.state).child(keyword);
        } else if (area == 1) {
            messageListRef = locationsRef.child('citywise').child(loc.country).child(loc.state).child(loc.city).child(keyword);
        } else if (area == 3) {
            messageListRef = locationsRef.child('countrywise').child(loc.country).child(keyword);
        } else if (area == 4) {
            messageListRef = keywordsRef.child(keyword).child('groups');
        }
        var firstMessagesQuery = messageListRef.limitToLast(500);
        firstMessagesQuery.on('child_added', function(childSnapshot) { 
            /* handle child add */ 
            //console.log('key is: ', childSnapshot.key());
            groupRef.child(childSnapshot.key()).once('value', function(returnVar) {
                $scope.$apply(function() {
                    $scope.showLoadingIcon = false;
                    mkServices.list($scope.myGroupFirebaseArray, returnVar, loc);
                });
            });
        });
    };//end if findresult
    
    
    if ($routeParams.keyword) {
        var loc1 = {city: $routeParams.city, state: $routeParams.state, country: $routeParams.country, lat: $routeParams.lat, lng: $routeParams.lng};
        $scope.findResult($routeParams.keyword, loc1, $routeParams.area, parseInt($routeParams.page));
    } else if ($routeParams.kw) {
        console.log(keywordsRef);
        keywordsRef.child(btoa($routeParams.kw)).on('child_added', function(snapshot) {
            console.log($routeParams.kw, ', ', btoa($routeParams.kw), ', ', snapshot.val());
            return;
            $scope.showLoadingIcon = false;
            mkServices.list($scope.myGroupFirebaseArray, snapshot, null);
        });
    } else {
        groupRef.orderByChild("createdAt").limitToLast(500).on("child_added", function(snapshot) {
            $timeout( function(){
                $scope.showLoadingIcon = false;
                mkServices.list($scope.myGroupFirebaseArray, snapshot, null);
            }, 1000);
        });
    }
}])
;