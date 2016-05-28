'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {
    //var ref = new Firebase('https://mycontacts12.firebaseio.com/sqlqueries');
    var ref = new Firebase('https://examples-sql-queries.firebaseio.com');
    var refUser = ref.child('user');
    var refMessages = ref.child('messages');
    /*
    startAt: Specify the first priority or record ID to be returned
    endAt: Specify the last priority or record ID to be returned
    limit: Return up to this many children, instead of all records at the location
    on: Listen in real-time for any change to the data
    once: Fetch data exactly one time
    */
    
    
    
    /*A. Select a user by ID (WHERE id = x)
    
    
    We’ll start off with the basics and build from here. In Firebase queries, records are stored in a “path”, which is simply a URL in the data hierarchy. In our sample data, we’ve stored our users at /user. So to retrieve record by it’s id, we just append it to the URL:
    */
    refUser.child('123').once('value', function(snap) {
        console.log('A. Select a user by ID (WHERE id = x)');
       console.log('I fetched a user!', snap.val());
    });
    
    /*B. Find a user by email address (WHERE email = x)
    
        Selecting an ID is all good and fine. But what if I want to look up an account by something that’s not already part of the URL path?

Well this is where ordered data becomes our friend. Since we know that email addresses will be a common lookup method, we can call setPriority() whenever we add a new record. Then we can use that priority to look them up later.
    */
    refUser
    .startAt('kato@firebase.com')
    .endAt('kato@firebase.com')
    .once('value', function(snap) {
       console.log('B. Find a user by email address (WHERE email = x)');
       console.log('accounts matching email address', snap.val())
    });
    
    /*
        C. Get messages posted yesterday (WHERE timestamp BETWEEN x AND y)
        
        What if we’d like to select a range of data? Ordering data with priorities is quite useful for this as well:
    */
    var startTime = 1379360596961;
    var endTime = 1379360663613;
    refMessages
    .startAt(startTime)
    .endAt(endTime)
    .once('value', function(snap) {
        console.log('C. Get messages posted yesterday (WHERE timestamp BETWEEN x AND y)');
       console.log('messages in range', snap.val());
    });
    /*
        D. Paginate through widgets (LIMIT 10 OFFSET 10)
        
        First of all, let’s make some assertions. Unless we’re talking about a static data set, pagination behavior becomes very ambiguous. For instance, how do I define page numbers in a constantly changing data set where records are deleted or added frequently? How do I define the offset? The “last” page? If those questions are difficult to answer, then pagination is probably not the right answer for your use case.

Pagination for small, static data sets (less than 1MB) can be done entirely client side. For larger static data sets, things get a bit more challenging. Assuming we’re writing append-only data, we can use our ordered data examples above and assign each message a page number or a unique incremental counter and then use startAt()/endAt().
        // fetch page 2 of messages
new Firebase("https://examples-sql-queries.firebaseio.com/messages")
    .startAt(2) // assumes the priority is the page number
    .endAt(2)
    .once('value', function(snap) {
       console.log('messages in range', snap.val());
    });
    
    But what if we’re working with something like our widgets path, which doesn’t have priorities? We can simply “start at” the last record on the previous page by passing null for a priority, followed by the last record id:
    */
}]);