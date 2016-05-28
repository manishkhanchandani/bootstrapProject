'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/active', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/completed', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.directive('todoBlur', function () {
	return function (scope, elem, attrs) {
		elem.bind('blur', function () {
			scope.$apply(attrs.todoBlur);
		});

		scope.$on('$destroy', function () {
			elem.unbind('blur');
		});
	};
})

.directive('todoEscape', function () {
	var ESCAPE_KEY = 27;
	return function (scope, elem, attrs) {
		elem.bind('keydown', function (event) {
			if (event.keyCode === ESCAPE_KEY) {
				scope.$apply(attrs.todoEscape);
			}
		});

		scope.$on('$destroy', function () {
			elem.unbind('keydown');
		});
	};
})

.directive('todoFocus', function todoFocus($timeout) {
	return function (scope, elem, attrs) {
		scope.$watch(attrs.todoFocus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].focus();
				}, 0, false);
			}
		});
	};
})

.filter('todoFilter', function ($location) {
	return function (input) {
		var filtered = {};
		angular.forEach(input, function (todo, id) {
			var path = $location.path();
			if (path === '/active') {
				if (!todo.completed) {
					filtered[id] = todo;
				}
			} else if (path === '/completed') {
				if (todo.completed) {
					filtered[id] = todo;
				}
			} else {
				filtered[id] = todo;
			}
		});
		return filtered;
	};
})

.controller('View1Ctrl', ['$scope', '$location', '$firebaseArray', function($scope, $location, $firebaseArray) {
    var fireRef = new Firebase('https://mycontacts12.firebaseio.com/learn/todos');
    $scope.todos = $firebaseArray(fireRef);
    $scope.newTodo = '';
	$scope.editedTodo = null;
    $scope.$watch('todos', function () {
        var total = 0;
		var remaining = 0;
        $scope.todos.forEach(function (todo) {
            // Skip invalid entries so they don't break the entire app.
            if (!todo || !todo.title) {
                return;
            }
            total++;
            if (todo.completed === false) {
                remaining++;
            }
        });
        $scope.totalCount = total;
        $scope.remainingCount = remaining;
        $scope.completedCount = total - remaining;
        $scope.allChecked = remaining === 0;
    }, true);
    $scope.addTodo = function () {
		var newTodo = $scope.newTodo.trim();
		if (!newTodo.length) {
			return;
		}
		$scope.todos.$add({
			title: newTodo,
			completed: false
		});
		$scope.newTodo = '';
	};
    $scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
		$scope.originalTodo = angular.extend({}, $scope.editedTodo);
	};
    $scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		var title = todo.title.trim();
		if (title) {
			$scope.todos.$save(todo);
		} else {
			$scope.removeTodo(todo);
		}
	};
    $scope.revertEditing = function (todo) {
		todo.title = $scope.originalTodo.title;
		$scope.doneEditing(todo);
	};
    $scope.removeTodo = function (todo) {
		$scope.todos.$remove(todo);
	};
    $scope.clearCompletedTodos = function () {
		$scope.todos.forEach(function (todo) {
			if (todo.completed) {
				$scope.removeTodo(todo);
			}
		});
	};
    
    $scope.markAll = function (allCompleted) {
		$scope.todos.forEach(function (todo) {
			todo.completed = allCompleted;
			$scope.todos.$save(todo);
		});
	};
    if ($location.path() === '') {
		$location.path('/');
	}
	$scope.location = $location;
}]);