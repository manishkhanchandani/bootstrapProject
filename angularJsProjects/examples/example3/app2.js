//Adding a Controller to a Module: Option 2

var demoApp = angular.module('demoApp', []);

angular.module('demoApp').controller('SimpleController', function ($scope) {
    $scope.customers = [
        { name: 'Dave Jones', city: 'Phoenix' },
        { name: 'Jamie Riley', city: 'Atlanta' },
        { name: 'Heedy Wahlin', city: 'Chandler' },
        { name: 'Thomas Winter', city: 'Seattle' }
    ];
});