http://bootstrap.mkgalaxy.com/firebase/project2/#/view1
http://bootstrap.mkgalaxy.com/firebase/chat

schedule app
https://scotch.io/tutorials/build-a-real-time-scheduling-app-using-angularjs-and-firebase
chat app
http://code.tutsplus.com/articles/using-firebase-with-angularjs--cms-22233


All Firebase database data is stored as JSON objects. There are no tables or records. When we add data to the JSON tree, it becomes a key in the existing JSON structure. 

Scripts to add

<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular-route.js"></script>
<!-- Firebase -->
<script src="https://cdn.firebase.com/js/client/2.2.4/firebase.js"></script>
<!-- AngularFire -->
<script src="https://cdn.firebase.com/libs/angularfire/1.1.2/angularfire.min.js"></script>

Creating a Firebase database Reference 

To read and write database data, we first create a reference to the Firebase database. This data to be loaded is specified with a URL.

Example:
new Firebase('https://docs-examples.firebaseio.com/web/data');

Creating a reference does not create a connection to the server or begin downloading data. Data is not fetched until a read or write operation is invoked. Once it is retrieved, it stays cached locally until the last event listener is removed.

Read only version of this database is:
https://docs-examples.firebaseio.com/web/data

It's possible to directly access child nodes in the data as well. For example, to point to Mary Chen's name, simply append users/mchen/name to the URL:

Copy
new Firebase("https://docs-examples.firebaseio.com/web/data/users/mchen/name");

We can achieve the same result from an existing parent reference by using the child() API call:

Copy
var rootRef = new Firebase('https://docs-examples.firebaseio.com/web/data');
rootRef.child('users/mchen/name');

- Limitations and Restrictions

A quick reference to limitations in data storage and read ops in a Firebase database.

Description	                    Limit	            Notes

Depth of child nodes	        32	

Length of a key	                768 bytes	        UTF-8 encoded, cannot contain . $ # [ ] / or ASCII control characters 0-31 or 127

Size of one child value	        10mb	            UTF-8 encoded

Write from SDK	                16mb	            UTF-8 encoded

Write from REST	                256mb	

Nodes in a read operation	    100 million	

- Backups and Restores

Firebase performs automated backups of all Firebase databases daily. The backups are stored for 60 days at an off-site facility. 



- Ways to Save Data

set( )	        Write or replace data to a defined path, like messages/users/<username>
update( )	    Update some of the keys for a defined path without replacing all of the data
push( )	        Add to a list of data in the database. Every time you call push() your database generates a unique ID, like messages/users/<unique-user-id>/<username>
transaction( )	Use our transactions feature when working with complex data that could be corrupted by concurrent updates

Writing Data with set()

var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog");
Let's start by saving some user data. We'll store each user by a unique username, and we'll also store their full name and date of birth. Since each user will have a unique username, it makes sense to use set() here instead of push() since we already have the key and don't need to create one.

First, we'll create a database reference to our user data. Then we'll use set() to save a user object to the database with the user's username, full name, and birthday. We can pass set() a string, number, boolean, null, array or any JSON object. Passing null to set() will remove the data at the specified location. In this case we'll pass it an object:

var usersRef = ref.child("users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});

You can also save data directly to a child location:

Copy
usersRef.child("alanisawesome").set({
  date_of_birth: "June 23, 1912",
  full_name: "Alan Turing"
});
usersRef.child("gracehop").set({
  date_of_birth: "December 9, 1906",
  full_name: "Grace Hopper"
});

Note: Using set() will overwrite the data at the specified location, including any child nodes.


Updating Saved Data

If you want to write to multiple children of a database location at the same time without overwriting other child nodes, you can use the update() method as shown below:

Copy
var hopperRef = usersRef.child("gracehop");
hopperRef.update({
  "nickname": "Amazing Grace"
});

This will update Grace's data to include her nickname. If we had used set() here instead of update(), it would have deleted both full_name and date_of_birth from our hopperRef.

Note: update() only updates data at the first child level, any data passed in beyond the first child level is a treated as a set() operation.

Adding a Completion Callback

If you'd like to know when your data has been committed, you can add a completion callback. Both set() and update() take an optional completion callback that is called when the write has been committed to the database. If the call was unsuccessful for some reason, the callback will be passed an error object indicating why the failure occurred.

Copy
dataRef.set("I'm writing data", function(error) {
  if (error) {
    alert("Data could not be saved." + error);
  } else {
    alert("Data saved successfully.");
  }
});

Firebase JavaScript clients provide a push() function that generates a unique ID, or key, for each new child. By using unique child keys, several clients can add children to the same location at the same time without worrying about write conflicts.

var postsRef = ref.child("posts");
  var newPostRef = postsRef.push();
  newPostRef.set({
    author: "gracehop",
    title: "Announcing COBOL, a New Programming Language"
  });
  // we can also chain the two calls together
  postsRef.push().set({
    author: "alanisawesome",
    title: "The Turing Machine"
  });
  
  
  In JavaScript, the pattern of calling push() and then immediately calling set() is so common that we let you combine them by passing the data to be set directly to push() as follows:

Copy
// This is equivalent to the calls to push().set(...) above
  postsRef.push({
    author: "gracehop",
    title: "Announcing COBOL, a New Programming Language"
  });
  
  
  Getting the Unique ID Generated by push()

Calling push() will return a reference to the new data path, which you can use to get the value of its ID or set data to it. The following code will result in the same data as the above example, but now we'll have access to the unique push ID that was generated:

Copy
// Generate a reference to a new location and add some data using push()
var newPostRef = postsRef.push();
// Get the unique ID generated by push()
var postID = newPostRef.key();

As you can see, calling key() on our push() reference gives us the value of the unique ID.

- Network Connectivity and Offline Writes

If a client loses network connection, your app will continue functioning correctly.


Getting Started

To read our post data, we can do the following:
// Get a database reference to our posts
var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


This function will be called anytime new data is added to our database reference, and we don't need to write any extra code to make this happen.

Notice that we used the value event type in our example above, which reads the entire contents of a Firebase database reference, even if only one piece of data changed. value is one of the five different event types listed below that we can use to read data from the database.

Read Event Types

Value

The value event is used to read a static snapshot of the contents at a given database path, as they existed at the time of the read event. It is triggered once with the initial data and again every time the data changes. The event callback is passed a snapshot containing all data at that location, including child data. In our code example above, value returned all of the blog posts in our app. Everytime a new blog post is added, the callback function will return all of the posts.
Child Added

The child_added event is typically used when retrieving a list of items from the database. Unlike value which returns the entire contents of the location, child_added is triggered once for each existing child and then again every time a new child is added to the specified path. The event callback is passed a snapshot containing the new child's data. For ordering purposes, it is also passed a second argument containing the key of the previous child.

If we wanted to retrieve only the data on each new post added to our blogging app, we could use child_added:

Copy
// Get a reference to our posts
var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
// Retrieve new posts as they are added to our database
ref.on("child_added", function(snapshot, prevChildKey) {
  var newPost = snapshot.val();
  console.log("Author: " + newPost.author);
  console.log("Title: " + newPost.title);
  console.log("Previous Post ID: " + prevChildKey);
});
In this example the snapshot will contain an object with an individual blog post. Because we converted our post to an object using val(), we have access to the post's author and title properties by calling author and title respectively. We also have access to the previous post ID from the second prevChildKey argument.
Child Changed

The child_changed event is triggered any time a child node is modified. This includes any modifications to descendants of the child node. It is typically used in conjunction with child_added and child_removed to respond to changes to a list of items. The snapshot passed to the event callback contains the updated data for the child.

We can use child_changed to read updated data on blog posts when they are edited:

Copy
// Get a reference to our posts
var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
// Get the data on a post that has changed
ref.on("child_changed", function(snapshot) {
  var changedPost = snapshot.val();
  console.log("The updated post title is " + changedPost.title);
});
Child Removed

The child_removed event is triggered when an immediate child is removed. It is typically used in conjunction with child_added and child_changed. The snapshot passed to the event callback contains the data for the removed child.

In our blog example, we'll use child_removed to log a notification about the deleted post to the console:

Copy
// Get a reference to our posts
var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
// Get the data on a post that has been removed
ref.on("child_removed", function(snapshot) {
  var deletedPost = snapshot.val();
  console.log("The blog post titled '" + deletedPost.title + "' has been deleted");
});
Child Moved

The child_moved event is used when working with ordered data, which is covered in the next section.

Querying Data

With Firebase database queries, we can selectively retrieve data based on various factors. To construct a query in your database, you start by specifying how you want your data to be ordered using one of the ordering functions: orderByChild(), orderByKey(), orderByValue(), or orderByPriority(). You can then combine these with five other methods to conduct complex queries: limitToFirst(), limitToLast(), startAt(), endAt(), and equalTo().

Ordering by a specified child key

We can order nodes by a common child key by passing that key to orderByChild(). For example, to read all dinosaurs ordered by height, we can do the following:

Copy
var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
ref.orderByChild("height").on("child_added", function(snapshot) {
  console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
});

Ordering by key name

We can also order nodes by their keys using the orderByKey() method. The following example reads all dinosaurs in alphabetical order:

Copy
var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
ref.orderByKey().on("child_added", function(snapshot) {
  console.log(snapshot.key());
});
Ordering by value

We can order nodes by the value of their child keys using the orderByValue() method. Let's say the dinosaurs are having a dino sports competition and we're keeping track of their scores in the following format:

Copy
{
  "scores": {
    "bruhathkayosaurus" : 55,
    "lambeosaurus" : 21,
    "linhenykus" : 80,
    "pterodactyl" : 93,
    "stegosaurus" : 5,
    "triceratops" : 22
  }
}
To sort the dinosaurs by their score, we could construct the following query:

Copy
var scoresRef = new Firebase("https://dinosaur-facts.firebaseio.com/scores");
scoresRef.orderByValue().on("value", function(snapshot) {
  snapshot.forEach(function(data) {
    console.log("The " + data.key() + " dinosaur's score is " + data.val());
  });
});
