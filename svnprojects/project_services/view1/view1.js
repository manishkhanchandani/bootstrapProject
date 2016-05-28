'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/post', {
    templateUrl: 'view1/post.html',
    controller: 'PostCtrl'
  });
}])

.controller('PostCtrl', ['$scope', 'mkServices', function($scope, mkServices) {
	$scope.data = {};
  $scope.error = null;
  $scope.data.selectedItem = {};
  
  $scope.services = mkServices.services();
  console.log($scope.services);
	
	//for ngAutocomplete
	$scope.details = {};
	$scope.mapOptions = {
      types: 'geocode'
    };
	//end for ngAutocomplete

	$scope.submitPostForm = function(details) {
    if (!$scope.data.selectedItem.key) {
      $scope.error = 'Please choose the category';
      return;
    }
    //create variable to submit the data
		var post = {};
		post.title = $scope.data.title || '';
		post.category_id = $scope.data.selectedItem.key || '';
		post.description = $scope.data.description || '';
		post.email = $scope.data.email || '';
		post.phone = $scope.data.phone || '';
		post.skype = $scope.data.skype || '';
		post.whatsapp = $scope.data.whatsapp || '';
		post.location = $scope.data.location || '';
		post.address2 = $scope.data.address2 || '';
		post.charges = $scope.data.charges || '';
		post.image = $scope.data.image || '';
		post.createdAt = Firebase.ServerValue.TIMESTAMP;
		post.lat = details.components.lat;
		post.lng = details.components.lng;
		post.owner_id = $scope.userData.uid;
		var pushRef = $scope.ref.child('postings').push(post);
    //get the submitted id
    var id = pushRef.key();
    $scope.ref.child('users').child($scope.userData.uid).child('ownedProfiles').child(id).set(true);
		$scope.ref.child('browsePostings').child('citywise').child(btoa(details.components.country)).child(btoa(details.components.state)).child(btoa(details.components.city)).child(btoa(post.category_id)).child(id).set(true);
    $scope.ref.child('browsePostings').child('statwise').child(btoa(details.components.country)).child(btoa(details.components.state)).child(btoa(post.category_id)).child(id).set(true);
    $scope.ref.child('browsePostings').child('countrywise').child(btoa(details.components.country)).child(btoa(post.category_id)).child(id).set(true);
    $scope.ref.child('browsePostings').child('countywise').child(btoa(details.components.country)).child(btoa(details.components.state)).child(btoa(details.components.county)).child(btoa(post.category_id)).child(id).set(true);
    $scope.error = 'Your post was successfully submitted';
    $scope.data = {};
		//we will add more firebase insertion next time, for better browsing and searching
	};
}])


.controller('View1Ctrl', ['$scope', 'mkServices', function($scope, mkServices) {

  $scope.data = {};
  //for ngAutocomplete
  $scope.details = {};
  $scope.mapOptions = {
      types: '(cities)'
    };
  //end for ngAutocomplete
  
  //setting some variables
  $scope.categories = mkServices.services();
  $scope.location = mkServices.locationType();
  $scope.sorting = mkServices.sortingType();
  
  $scope.data.selectedlocationType = $scope.location['county'];
  $scope.data.selectedSortingType = $scope.sorting['createdDesc'];
  console.log($scope);
  //setting ends
}])
;