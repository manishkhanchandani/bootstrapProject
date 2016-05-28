'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {
    var ref = new Firebase('https://mycontacts12.firebaseio.com/livelinks');
    //1. adding a data & retrieving data
        //A. adding list of items to firebase db using "push"
            var sampleLink = {url: 'google.com', 'title': 'A great search engine'};
            var r1 = ref.push(sampleLink);
            var r2 = ref.push({url: 'bing.com', 'title': 'A great search engine2'});
            var id1 = r1.key();
            console.log('id1: ', id1);
            var id2 = r2.key();
            console.log('id2: ', id2);
        //B. simply retrieving of values from a firebase db
ref.on('value', function(snapshot) {
    console.log('value: ', snapshot.val()); 
});
//C. Listening to "value", "child_added", "child_changed", and "child_removed" events to track real-time data changes
ref.on('child_added', function(snapshot) {
    console.log('child_added: ', snapshot.val()); 
});
ref.on('child_changed', function(snapshot) {
    console.log('child_changed: ', snapshot.val()); 
});
ref.on('child_removed', function(snapshot) {
    console.log('child_removed: ', snapshot.val()); 
});
    
    //2. updating and deleting data
        //updating data using set
            //get the url for one of the links
            var linkRef2 = ref.child(id2);
            var linkUrl2 = linkRef2.child('url');
            linkUrl2.set('bing.com/search');
        //updating data using update
            linkRef2.update({url: 'bing.com'});
        //deleting data using remove
            linkRef2.remove();
            var linkRef1 = ref.child(id1);
            linkRef1.remove();
    
    //3. submitting and managing links
        //see view2
}]);