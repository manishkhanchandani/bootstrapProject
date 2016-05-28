angular.module("myApp", ["ngLocale"])
  .controller("mainController", ['$scope', '$locale', function ($scope, $locale)
  {
      console.log($scope);
    // Store the current locale ID in a variable
    $scope.localeId = $locale.id;

    // Store the current date/time in a variable
    $scope.currentDate = new Date();
  }]);