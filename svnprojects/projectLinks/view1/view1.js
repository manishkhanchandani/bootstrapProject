'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/login', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/logout', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/signup', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.filter('getOriginalUrl', function() {
  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input) {
    var output;
    // Do filter work here
    output = atob(input);
    return output;
  }
})

.controller('View1Ctrl', ['$scope', '$firebaseArray', '$rootScope', '$location', function($scope, $firebaseArray, $rootScope, $location) {
    //variable definition
    var ref = new Firebase('https://mycontacts12.firebaseio.com/projectLiveLinks');
    var refLinks = ref.child('links');
    var refUsers = ref.child('users');
    $scope.userInfo = null;
    $scope.userRegData = {};
    $scope.userRegDataTmp = {};
    $scope.userLoginData = {};
    $scope.error = null;
    $scope.pageData = {};
    $scope.pageData.showRecordForm = false;
    $scope.pageData.showLoginForm = false;
    $scope.pageData.showSignupForm = false;
    $scope.usersForLink = {};
    $scope.votesForLink = {};
    $scope.addRec = {};

    //get the new records and save it in scope
    var liveLinksArray = $firebaseArray(refLinks);
    $scope.liveLinksArray = liveLinksArray;
    
    $scope.setUsers = function (snapshot) {
        if (snapshot.val()) {
            $scope.usersForLink = {};
            angular.forEach(snapshot.val(), function(value, key) {
                
                angular.forEach(value.users, function(valueUser, keyUser) {
                    refUsers.child(keyUser).child('alias').once('value', function(uSnapshot) {
                        $scope.$apply(function() {
                            if (typeof($scope.usersForLink[key]) === 'undefined') {
                                $scope.usersForLink[key] = [];
                            }
                            $scope.usersForLink[key].push(uSnapshot.val());
                        });
                    });
                });//end angular.forEach(value.users)
            });//end angular.forEach
        }//end if
    };
    
    refLinks.once('value', function(snapshot) {
        $scope.setUsers(snapshot);
    });
        
    refLinks.on('value', function(snapshot) {
        $scope.liveLinksArray = [];
        if (snapshot.val()) {
            //$scope.usersForLink = {};
            $scope.votesForLink = {};
            angular.forEach(snapshot.val(), function(value, key) {
                $scope.votesForLink[key] = 0;
                    angular.forEach(value.votes, function(valueVote, keyVote) {
                    $scope.votesForLink[key] += valueVote;
                });//end angular.forEach(snapshot.val())
                
                /*angular.forEach(value.users, function(valueUser, keyUser) {
                    refUsers.child(keyUser).child('alias').once('value', function(uSnapshot) {
                        $scope.$apply(function() {
                            if (typeof($scope.usersForLink[key]) === 'undefined') {
                                $scope.usersForLink[key] = [];
                            }
                            $scope.usersForLink[key].push(uSnapshot.val());
                        });
                    });
                });//end angular.forEach(value.users)*/
                $scope.liveLinksArray.push({id: key, url: atob(key), title: value.title, users: value.users});
            });//end angular.forEach
        }//end if
    });//end refLinks.on
    
    $scope.vote = function(voteId, voteVal) {
        console.log('vote submitted by ', $scope.userInfo.uid, ' for id: ', voteId, ' with value: ', voteVal);
        refLinks.child(voteId).child('votes').child($scope.userInfo.uid).set(voteVal);
    };

    $scope.addRecord = function() {
        if (!$scope.userInfo) {
            $scope.error = {code: 'invalid user'};
            return false;
        } else if (typeof($scope.userInfo.uid) === 'undefined') {
            $scope.error = {code: 'invalid user'};
            return false;
        } else if (Object.keys($scope.userInfo).length === 0) {
            $scope.error = {code: 'invalid user'};
            return false;
        }
        $scope.addRec.url = ($scope.addRec.url).substring(0,4) !== "http" ? "http://" + $scope.addRec.url : $scope.addRec.url;
        $scope.addRec.url = btoa($scope.addRec.url);
        refLinks.child($scope.addRec.url).update({title: $scope.addRec.title}, function(error) {
            if (error) {
                console.log('error: ', error);
                $scope.$apply(function() {
                    $scope.error = error;
                });
                return;
            }
            
            $scope.$apply(function() {
                //console.log('debug: ', $scope.userInfo.uid, ', ', $scope.addRec.url);
                refLinks.child($scope.addRec.url).child('users').child($scope.userInfo.uid).set(true);
                refUsers.child($scope.userInfo.uid).child('links').child($scope.addRec.url).set(true);
                refLinks.child('author').set($scope.userInfo.uid);
                refLinks.child('createdAt').set(Firebase.ServerValue.TIMESTAMP);
                $scope.addRec = {};
                $scope.pageData.showRecordForm = false;
            });
            //once again call links
            refLinks.once('value', function(snapshot) {
                $scope.setUsers(snapshot);
            });
            //once again links end
        });
    };
    
    $scope.addUser = function() {
        $scope.error = null;
        if ($scope.userRegData.password !== $scope.userRegDataTmp.cpassword) {
            $scope.error = {};
            $scope.error.code = 'Password does not match with confirm password';
            return false;
        }
        ref.createUser({
            email: $scope.userRegData.email, 
            password: $scope.userRegData.password
        }, function(error, authResponse) {
            console.log(error);
            if (error) {
                $scope.$apply(function() {
                    $scope.error = error;
                });
            } else {
                refUsers.child(authResponse.uid).set({alias: $scope.userRegData.username, email: $scope.userRegData.email, uid: authResponse.uid}, function(error) {
                    if (error) {
                        $scope.$apply(function() {
                            $scope.error = error;
                        });
                    } else {
                        $scope.$apply(function() {
                            $scope.userLoginData.email = $scope.userRegData.email;
                            $scope.userLoginData.password = $scope.userRegData.password;
                        });
                        $scope.loginUser();
                    }
                });
            }
        });   
    };
    
    $scope.loginUser = function() {
        ref.authWithPassword({
            email: $scope.userLoginData.email,
            password: $scope.userLoginData.password
        }, function(error) {
            if (error) {
                $scope.$apply(function() {
                    $scope.error = error;
                });
            } else {
                $location.path('/view1');   
            }
        });  
    };
    
    ref.onAuth(function(authResponse) {
       if (authResponse) {
            console.log('user is logged in', authResponse); 
            refUsers.child(authResponse.uid).once('value', function(snapshot) {
                $scope.$apply(function() {
	  			    $scope.userInfo = snapshot.val();
                    $scope.userInfo.uid = authResponse.uid;
                    $rootScope.userInfo = $scope.userInfo;
                });
                //onLogin();
	  		});  
       } else {
            console.log('user is logged out');
            $rootScope.userInfo = null;
            //onLogout();
       }
    });
    
    $scope.logout = function() {
        ref.unauth();   
    }
    
    $scope.showAddRecordForm = function() {
        $scope.pageData.showRecordForm = true;
    };
    
    if ($location.path() == '/logout') {
        $scope.logout();
        $scope.pageData.showLoginForm = false;
        $scope.pageData.showSignupForm = false;
        $rootScope.userInfo = null;
        $location.path('/view1');
    } else if ($location.path() == '/login') {
        $scope.pageData.showLoginForm = true;
    } else if ($location.path() == '/signup') {
        $scope.pageData.showSignupForm = true;
    } else {
        $scope.pageData.showLoginForm = false;
        $scope.pageData.showSignupForm = false;
    }
}]);