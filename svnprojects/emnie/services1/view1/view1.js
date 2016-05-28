angular.module("myApp.view1", [
	'ngRoute'])
.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/view1", {
		templateUrl: "view1/view1.html",
		controller: "View1Ctrl"
	})
	.when("/post", {
		templateUrl: "view1/postSteps.html",
		controller: "PostCtrl"
	});
}])
.controller("View1Ctrl", ['$scope', function($scope) {
}])
.controller("PostCtrl", ['$scope', 'mkServices', '$location', function($scope, mkServices, $location) {
}])
;