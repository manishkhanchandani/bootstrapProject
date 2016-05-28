(function() {
  var moduleName = 'googleLoginModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('googleLogin', googleLogin);
    

  function googleLogin() {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'js/directives/googleLogin.html',
          link: function(scope, elem, attrs) {
            var clientId = '754890700194-4p5reil092esbpr9p3kk46pf31vkl3ub.apps.googleusercontent.com';
            var apiKey = 'AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs';
            var scopes = 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read';
            
            
              var data = localStorage.getItem('userData');
              if (data) {
                scope.userData = JSON.parse(data);  
              }
              
              scope.logout = function() {
                  gapi.auth.signOut();
                  scope.userData = null;
                  localStorage.removeItem('userData');
              };
              
              scope.login = function () {
                if (!gapi.client) {
                  return false; 
                }
                handleClientLoad();
                handleAuthClick();
              };
            function handleClientLoad() {
                // Step 2: Reference the API key
                gapi.client.setApiKey(apiKey);
                //window.setTimeout(checkAuth,1);
              }
              
              function checkAuth() {
                gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
              }
              
              function handleAuthResult(authResult) {
                //var authorizeButton = document.getElementById('authorize-button');
                if (authResult && !authResult.error) {
                  //authorizeButton.style.visibility = 'hidden';
                  makeApiCall();
                } else {
                  //authorizeButton.style.visibility = '';
                  //authorizeButton.onclick = handleAuthClick;
                }
              }
              
              function handleAuthClick(event) {
                // Step 3: get authorization to use private data
                gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
                return false;
              }
              
              // Load the API and make an API call.  Display the results on the screen.
              function makeApiCall() {
                // Step 4: Load the Google+ API
                gapi.client.load('plus', 'v1').then(function() {
                  // Step 5: Assemble the API request
                  var request = gapi.client.plus.people.get({
                    'userId': 'me'
                  });
                  // Step 6: Execute the API request
                  request.then(function(resp) {
                    console.log(resp);
                    scope.userData = {
                      id: resp.result.id,
                      email: resp.result.emails[0].value,
                      url: resp.result.url,
                      name: resp.result.displayName,
                      firstName: resp.result.name.givenName,
                      lastName: resp.result.name.familyName,
                      image: resp.result.image.url
                    };
                    console.log(scope.userData);
                    if(!scope.$$phase) scope.$apply();
                    localStorage.setItem('userData', JSON.stringify(scope.userData));
                  }, function(reason) {
                    console.log('Error: ' + reason.result.error.message);
                  });
                });
              }//end function 
          }//end link
    };//end return
  }//end function googleLogin()

}());