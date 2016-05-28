'use strict';

angular.module('ngSocialApp.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('1698029573760237');
  $facebookProvider.setPermissions("email,public_profile,user_likes,user_posts,user_friends,user_about_me,user_birthday,user_education_history,publish_actions,user_photos,user_hometown,user_location,user_relationships,user_relationship_details,user_religion_politics,user_status,user_tagged_places,user_videos,user_website,user_work_history,read_custom_friendlists,read_insights,read_audience_network_insights,read_page_mailboxes,manage_pages,publish_pages,rsvp_event,ads_read,ads_management");
  //"email,user_likes,public_profile,user_posts,user_friends,user_about_me,user_birthday,user_education_history,publish_actions,user_photos,user_events,user_games_activity,user_hometown,user_location,user_managed_groups,user_relationships,user_relationship_details,user_religion_politics,user_status,user_tagged_places,user_videos,user_website,user_work_history,read_custom_friendlists,read_insights,read_audience_network_insights,read_page_mailboxes,manage_pages,publish_pages,rsvp_event,ads_read,ads_management"
})
.run( function( $rootScope ) {
  // Cut and paste the "Load the SDK" code from the facebook javascript sdk page.

  // Load the facebook SDK asynchronously
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})


.controller('FacebookCtrl', ['$scope', '$facebook', function($scope, $facebook) {
    $scope.isLoggedIn = false;
    $scope.myPost = {};
    $scope.login = function() {
        $facebook.login().then(function() {
            console.log('logged in ');
            $scope.isLoggedIn = true;
            refresh();
        });
    }
    $scope.logout = function() {
        $facebook.logout().then(function() {
            console.log('logged out ');
            $scope.isLoggedIn = false;
            refresh();
        });
    }
    function refresh()
    {
        $facebook.api('/me?fields=id,name,first_name,last_name,gender,locale,email,link').then(function(response) {
            $scope.welcomeMsg = 'Welcome ' + response.name;
            $scope.isLoggedIn = true;
            $scope.userInfo = response;

            $facebook.api('/me/picture').then(function(picResponse) {
                $scope.picture = picResponse.data.url;
                $facebook.api('/me/permissions').then(function(permResponse) {
                    $scope.permissions = permResponse.data;
                    $facebook.api('/me/posts').then(function(postResponse) {
                        $scope.posts = postResponse.data;
                    });
                });
            });
        },
        function (err) {
            $scope.welcomeMsg = "Please log in";
        });
    }
    $scope.postStatus = function() {
        $facebook.api('/me/feed', 'post', {message: $scope.myPost.body}).then(function(response) {
            $scope.msg = 'Thanks for posting';
            refresh();
            $scope.myPost.body = '';
        });
    }
    refresh();
}]);