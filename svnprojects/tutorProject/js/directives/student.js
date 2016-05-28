(function() {

  var moduleName = 'student';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('createNewStudentProfile', createNewStudentProfile)
    .directive('editStudentProfile', editStudentProfile)
    .directive('manageStudentProfile', manageStudentProfile)
    .service('studentService', studentService)
    ;
    
  function createNewStudentProfile() {
    return {
          scope: {
          },
          templateUrl: 'js/directives/studentCreate.html',
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

  function editStudentProfile() {
    return {
          scope: {
          },
          templateUrl: 'js/directives/studentEdit.html',
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

  function manageStudentProfile() {
    return {
          scope: {
          },
          templateUrl: 'js/directives/studentManage.html',
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

  function studentService() {
    console.log('i am in service student');
  }

}());