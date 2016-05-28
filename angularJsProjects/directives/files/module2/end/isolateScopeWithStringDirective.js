(function() {

  var app = angular.module('directivesModule');

  app.directive('isolateScopeWithString', function () {
      return {
          scope: {
              name: '@' //@fullname
          },
          template: 'Name: {{name}}'
      };
  });

}());
