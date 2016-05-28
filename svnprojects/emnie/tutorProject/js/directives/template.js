(function() {

  var moduleName = 'tutorCreation';
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
    
  }
  
  function tutorService() {
    
  }

}());