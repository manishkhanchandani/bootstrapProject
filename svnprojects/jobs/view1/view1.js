'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngAutocomplete', 'firebase', 'angularUtils.directives.dirPagination'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/search/:country/:state/:city/:keyword/:page/:area/:lat/:lng', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })///search/US/CA/Manteca/php/1/2/37.7974273/-121.21605260000001
  ;
}])

.controller('View1Ctrl', ['$scope', '$routeParams', 'mkServices', '$location', function($scope, $routeParams, mkServices, $location) {
    var ref = mkServices.reference;
    var listingRef = ref.child('listing');
    var locationsRef = ref.child('locations');
    var keywordsRef = ref.child('keywords');
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
    $scope.currentPage = ($routeParams.page) ? $routeParams.page : 1;
    $scope.pageSize = 10;
    $scope.itemCount = 0;
    $scope.pageChangeHandler = function(num) {
        console.log('groups page changed to ' + num);
        var start = (num - 1) * 25;
        console.log($scope.autocomplete, $scope.searchQuery, start);
        mkServices.getMoreListings($scope.autocomplete, $scope.searchQuery, start, $scope.setItemCount);
    };

    $scope.changeFilter = function() {
        paginationService.setCurrentPage('__default', 1);
        $scope.currentPage = 1;
    };
    
    $scope.searchJobURL = function(q, loc, area, page) {
        //console.log('/search/'+loc.country+'/'+loc.state+'/'+loc.city+'/'+q+'/'+$scope.currentPage+'/'+area+'/'+loc.lat+'/'+loc.lng);        
        $location.path('/search/'+loc.country+'/'+loc.state+'/'+loc.city+'/'+q+'/'+page+'/'+area+'/'+loc.lat+'/'+loc.lng);
    };
    
    $scope.setItemCount = function (cnt) {
        $scope.itemCount = cnt;
    };
    
    $scope.findResult = function(q, loc, area) {
        console.log('q: ', q);
        console.log('loc: ', loc);
        console.log('area: ', area);
        $scope.details = {};
        $scope.area = area;
        $scope.searchQuery = q;
        $scope.details.components = loc;
        $scope.autocomplete = loc.city + ', ' + loc.state + ', ' + loc.country;
        mkServices.getMoreListings($scope.autocomplete, q, 0, $scope.setItemCount);
        $scope.myGroupFirebaseArray = [];
        var keyword = btoa(q.toLowerCase());
        var country = btoa(loc.country.toLowerCase());
        var state = btoa(loc.state.toLowerCase());
        var city = btoa(loc.city.toLowerCase());
        console.log('keyword: ', keyword, ' (', q.toLowerCase(), '), country: ', country, ' (', loc.country.toLowerCase(), '), state: ', state, ' (', loc.state.toLowerCase(), '), city: ', city, '(', loc.city.toLowerCase(), ')');
        var messageListRef = null;
        if (area == 2) {
            messageListRef = ref.child('statewise').child(country).child(state).child(keyword);
        } else if (area == 1) {
            messageListRef = ref.child('citywise').child(country).child(state).child(city).child(keyword);
        } else if (area == 3) {
            messageListRef = ref.child('countrywise').child(country).child(keyword);
        } else if (area == 4) {
            messageListRef = ref.child('keywordwise').child(keyword);
        }
        var firstMessagesQuery = messageListRef.limitToLast(250);
        firstMessagesQuery.on('child_added', function(childSnapshot) { 
            //console.log('key is: ', childSnapshot.key());
            listingRef.child(childSnapshot.key()).once('value', function(returnVar) {
                //console.log('listing details: ', returnVar.val());
                $scope.$apply(function() {
                    //$scope.showLoadingIcon = false;
                    mkServices.list($scope.myGroupFirebaseArray, returnVar, loc);
                });
            });
        });
    };
    
    if ($routeParams.keyword) {
        var loc1 = {city: $routeParams.city, state: $routeParams.state, country: $routeParams.country, lat: $routeParams.lat, lng: $routeParams.lng};
        $scope.findResult($routeParams.keyword, loc1, $routeParams.area, parseInt($routeParams.page));
    } 
}])
;