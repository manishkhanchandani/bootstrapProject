(function() {

  var moduleName = 'religion';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('createNewReligion', ['dataService', '$timeout', createNewReligion])
    .directive('updateReligion', updateReligion)
    .directive('listReligion', listReligion)
    .directive('followReligion', followReligion)
    .directive('unFollowReligion', unFollowReligion)
    .directive('favReligion', favReligion)
    .directive('unFavReligion', unFavReligion)
    .service('religionService', religionService)
    ;
    
  function createNewReligion(dataService, $timeout) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'js/directives/createReligion.html',
          link: function(scope, elem, attrs) {
            scope.data = {};
            scope.data.status = 1;
            scope.startError = false;
            
            function frmReligionSubmitFailed(data) {
              scope.data.error = data.statusText + ' ('+data.status+')';
              $timeout(function(){
                  scope.startError = true;
              }, 1000);
              $timeout(function(){
                  scope.data.error = null;
              }, 2000);
            }
            
            function frmReligionSubmit(data) {
              if (data.data.success == 0) {
                scope.data.error = data.data.errorMessage;
              } else {
                scope.data = {};
                scope.data.error = 'Religion created successfully';
              }
              $timeout(function(){
                  scope.startError = true;
              }, 1000);
              $timeout(function(){
                  scope.data.error = null;
              }, 2000);
            }
  
            scope.frmReligion = function() {
              var url = dataService.baseUrl + '/religion.php';
              url += '?action=saveReligion&saveIP=1&access_token='+scope.userData.access_token;
              var postData = 'title='+encodeURIComponent(scope.data.name);
              if (scope.data.description) {
                postData += '&data[description]='+encodeURIComponent(scope.data.description);
              }
              if (scope.data.tags) {
                postData += '&tags='+encodeURIComponent(scope.data.tags);
              }
              if (scope.data.created_by) {
                postData += '&data[created_by]='+encodeURIComponent(scope.data.created_by);
              }
              if (scope.data.created_on) {
                postData += '&data[created_on]='+encodeURIComponent(scope.data.created_on);
              }
              postData += '&path=/religion/all&tid=1&status='+parseInt(scope.data.status);
              dataService.post(url, postData, frmReligionSubmit, frmReligionSubmitFailed, false);
            };//end scope.frmReligion
            
          }//end link
      };//end return
  }
    
  function updateReligion() {
    return {
          scope: {
            
          },
          templateUrl: 'js/directives/createReligion.html',
          link: function(scope, elem, attrs) {

          }//end link
      };//end return
  }
    
  function listReligion() {
    return {
          scope: {
            
          },
          templateUrl: 'js/directives/createReligion.html',
          link: function(scope, elem, attrs) {

          }//end link
      };//end return
  }
    
  function followReligion() {
    return {
          scope: {
            
          },
          templateUrl: 'js/directives/createReligion.html',
          link: function(scope, elem, attrs) {

          }//end link
      };//end return
  }
    
  function unFollowReligion() {
    return {
          scope: {
            
          },
          templateUrl: 'js/directives/createReligion.html',
          link: function(scope, elem, attrs) {

          }//end link
      };//end return
  }
    
  function favReligion() {
    return {
          scope: {
            
          },
          templateUrl: 'js/directives/createReligion.html',
          link: function(scope, elem, attrs) {

          }//end link
      };//end return
  }
    
  function unFavReligion() {
    return {
          scope: {
            
          },
          templateUrl: 'js/directives/createReligion.html',
          link: function(scope, elem, attrs) {

          }//end link
      };//end return
  }
  
  function religionService() {
    return {
          scope: {
            
          },
          templateUrl: 'js/directives/createReligion.html',
          link: function(scope, elem, attrs) {

          }//end link
      };//end return
  }

}());