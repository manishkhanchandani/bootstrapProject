angular.module('myApp', [])
.factory('myfactory', function(){
	var names = ['mary', 'john', 'peter'];
	var factory = {};
	factory.getNames = function(){
		return names;
	};
	return factory;
})
.service('myService', function(){
	var names = ['Kelly', 'Ken'];
	this.getNames = function() {
		return names;
	}
})
/*.controller('myController', ['$scope', 'myfactory', function($scope, myfactory) {
	$scope.names = myfactory.getNames();
}]);*/
.controller('myController', ['$scope', 'myService', function($scope, myService) {
	$scope.names = myService.getNames();
}]);
