angular.module('myApp')

.directive('mkDispName', function() {
	return {
		template: '{{name}}',
		scope: {
			tutorVar: '='
		},
		link: function(scope, elem, attrs) {
			var t = scope.tutorVar;
			var name = '';
			name = name + (t.userFirstName ? t.userFirstName : t.firstName);
			name = name + ' ' + (t.userLastName ? t.userLastName : t.lastName);
			scope.name = name;
		}
	};
});