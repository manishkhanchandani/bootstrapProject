(function() {

  var moduleName = 'tutor';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('createNewTutorProfile', createNewTutorProfile)
    .service('tutorService', tutorService)
    ;
    
  function createNewTutorProfile() {
    return {
          scope: {
          },
          templateUrl: 'js/directives/tutorCreation.html',
          link: function(scope, elem, attrs) {
            console.log('i am in directive');
            //for autocomplete of location
            scope.details = {};
            scope.mapOptions = {
                types: 'geocode'
              };
            //ends for autocomplete of location
          }//end link
      };//end return
  }
  
  function tutorService() {
    console.log('i am in service tutor');
  }

}());