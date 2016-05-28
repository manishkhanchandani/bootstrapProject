
angular.module('myApp')
.service('dataService', ['$http', dataService]);

function dataService($http) {
  this.baseUrl = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php';

  this.get = function(url, callback, cache) {
      $http({
        method: 'GET',
        url: url,
        cache: cache
      }).then(function successCallback(response) {
          callback(response);
        }, function errorCallback(response) {
          console.log('error call back');
          console.log(response);
        });
  };
  
  this.post = function(url, data, callback, cache) {
      //console.log(url, data, callback, cache);
      $http({
        method: 'POST',
        url: url,
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        cache: cache
        //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //data: 'email='+encodeURIComponent($scope.frm.email)+'&question='+encodeURIComponent($scope.frm.question)+'&name='+encodeURIComponent($scope.frm.name)
      }).then(function successCallback(response) {
          //console.log('response is ', response);
          callback(response);
        }, function errorCallback(response) {
          console.log('error call back');
          console.log(response);
        });
  };
}