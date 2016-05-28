'use strict';

angular.module('myApp.admin', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'admin/admin.html',
    controller: 'AdminCtrl'
  });
}])

.controller('AdminCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    var groupKey2 = 'groupsNeededApproval';
    var groupRef2 = $scope.mainRef.child(groupKey2).child('groups');
    $scope.groupFirebaseArray = $firebaseArray(groupRef2);
    
    
    var groupKey = 'groups';
    var groupRef = $scope.mainRef.child(groupKey).child('groups');
    var keywordsRef = $scope.mainRef.child(groupKey).child('keywords');
    var userGroupsRef = $scope.mainRef.child(groupKey).child('userGroups');
    var groupUsersRef = $scope.mainRef.child(groupKey).child('groupUsers');
    var locationsRef = $scope.mainRef.child(groupKey).child('locations');
    
    $scope.approveGroup = function(id) {
        console.log(id);
        var record2 = $scope.groupFirebaseArray.$getRecord(id);
        var record = record2;
        console.log(record);
        $scope.locData = {};
        $scope.locData.location = {};
        $scope.locData.location.city = record.location.city;
        $scope.locData.location.state = record.location.state;
        $scope.locData.location.country = record.location.country;
        $scope.locData.location.lat = record.location.lat;
        $scope.locData.location.lng = record.location.lng;
        $scope.locData.topics = record.topics;
        $scope.locData.name = record.name;
        $scope.locData.memberName = record.memberName;
        $scope.locData.description = record.description;
        $scope.locData.createdAt = record.createdAt;
        $scope.locData.createdBy = record.createdBy;
        $scope.locData.imageURL = record.imageURL;
        console.log($scope.locData);
        groupRef.child(id).set($scope.locData);
        $scope.message = 'Group added successfully with ID ' + id;
        //adding group for each topics
        if (record.topics.length > 0) {
            for (var i = 0; i < record.topics.length; i++) {
                keywordsRef.child(btoa(record.topics[i].toLowerCase())).child(id).set(true);
            }
        }
        //adding group for each user
        userGroupsRef.child(record.createdBy).child(id).set(true);
        //adding user for each group
        groupUsersRef.child(id).child(record.createdBy).set({organizer: true, coorganizer: false, associateorganizer: false, eventorganizer: false, member: true});
        //locations come here
        locationsRef.child('citywise').child(record.location.country).child(record.location.state).child(record.location.city).child(id).set(true);
        locationsRef.child('statewise').child(record.location.country).child(record.location.state).child(id).set(true);
        locationsRef.child('countrywise').child(record.location.country).child(id).set(true);
        $scope.groupFirebaseArray.$remove(record2);
        
    };
    $scope.deleteGroup = function(id) {
        
    };
}]);