var app = angular.module('myapp', []);

app.directive('helloWorld', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: "b.html"
  };
});