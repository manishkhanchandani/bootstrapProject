Steps:

1. https://www.firebase.com/
create new account or signin with old account
manishkk74@gmail.com

2. Go to https://www.firebase.com/account/#/
and set up new app like mycontacts and url like mycontacts12

3. Click manage app to go into detail page

4. Download zip for angular seed:
https://github.com/angular/angular-seed and create project3 with all files of it
or skip following steps and take all files under app and put it in project3

a. Open package.json file and edit it in text editor
Add following lines in devDependencies
,
    "firebase":"*"
b. go to command line and run sudo npm install
c. run npm start and it will start running on port 8000 and you can view it at http://localhost:8000/app

d. bower install
e. bower install foundation

5. delete all js except app.js and angular js and contacts/contacts.js and change html body to

<div class="container">
    <div class="row">
        <div class="large-12 columns">
            <h1>My Contacts</h1>
        </div>
    </div>
    <div ng-view></div>
</div>

6. download foundation from http://foundation.zurb.com/develop/download.html

7. add foundation folder in the root folder

8. link following css in index.html

  <link href="foundation-5.5.2/css/foundation.css" rel="stylesheet" type="text/css">
also add js link: <script src="foundation-5.5.2/js/foundation.min.js"></script>

9. get firebase js file from https://www.firebase.com/docs/web/api/
and save in root

<script src="firebase.js"></script>

10. go to https://www.firebase.com/docs/web/libraries/angular/

add angular fire script as

<!-- Firebase -->
<script src="https://cdn.firebase.com/js/client/2.2.4/firebase.js"></script>
<!-- AngularFire -->
<script src="https://cdn.firebase.com/libs/angularfire/1.1.2/angularfire.min.js"></script>

11. add jquery js

12. summary

<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular-route.js"></script>
<!-- Firebase -->
<script src="https://cdn.firebase.com/js/client/2.2.4/firebase.js"></script>
<!-- AngularFire -->
<script src="https://cdn.firebase.com/libs/angularfire/1.1.2/angularfire.min.js"></script>
<script src="foundation-5.5.2/js/foundation.min.js"></script>
  <script src="app.js"></script>
  <script src="contacts/contacts.js"></script>
  
13. https://github.com/angular/angular-seed
git clone --depth=1 https://github.com/angular/angular-seed.git <your-project-name>

14. 