//Adding a Controller to a Module: Option 3
var demoApp = angular.module('demoApp', []);

(function() {
    var SimpleController = function ($scope) {
        $scope.customers = [
            { name: 'Dave Jones', city: 'Phoenix' },
            { name: 'Jamie Riley', city: 'Atlanta' }
        ];
        console.log($scope);
    };
    SimpleController.$inject = ['$scope'];
    angular.module('demoApp')
    .controller('SimpleController', SimpleController);
}());