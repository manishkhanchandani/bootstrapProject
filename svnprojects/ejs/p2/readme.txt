http://html2jade.org/
http://jade-lang.com/


sudo npm install express -g
sudo npm install express-generator -g
express --version
express pcrepair

This will output as:
  create : pcrepair
   create : pcrepair/package.json
   create : pcrepair/app.js
   create : pcrepair/public
   create : pcrepair/public/javascripts
   create : pcrepair/public/images
   create : pcrepair/public/stylesheets
   create : pcrepair/public/stylesheets/style.css
   create : pcrepair/routes
   create : pcrepair/routes/index.js
   create : pcrepair/routes/users.js
   create : pcrepair/views
   create : pcrepair/views/index.jade
   create : pcrepair/views/layout.jade
   create : pcrepair/views/error.jade
   create : pcrepair/bin
   create : pcrepair/bin/www

   install dependencies:
     $ cd pcrepair && npm install

   run the app:
     $ DEBUG=pcrepair:* npm start


Add following dependencies in package.json
	"nodemailer": "*"

go to pcrepair folder
and run:
npm install
npm start

this was giving error
so i copied the code of bin/www to app.js and run as node app in root folder

and then go to url: http://locahost:3000 and it works

Get bootstrap (bootstrap.css)
Copy css, js, and fonts folder to public foder in respective folders

Take any template from bootstrap like jumbotron,
put the different sections of template inside views/includes folder and call it in layout.jade as:
    include ./includes/navbar.jade
    include ./includes/showcase.jade
    .container
      block content

put main content inside the index.jade


Jade Layouts
do some content changes, like adding about, services, contact page, change some content in that.


Fetching Json
  Create a json file and save it in json folder
  Go to any route js file and add following
    var fs = require('fs');

    var results;
    fs.readFile('json/services.json', 'utf8', function(err, data) {
      if (err) {
        throw err;
      } else {
        results = JSON.parse(data);
      }
    });
  
  now add above results in routing part as follows:
    router.get('/', function(req, res, next) {
      res.render('services', { title: 'Services', services: results });
    });

  now you can use above services in template as follows:
    each service, i in services
      div.well
        h3 #{service.name}
        p #{service.description}
        p
          | Price Range: #{service.price_range}


Nodemailer Contact

  submission email using nodemailer,
  create contact page, with routing and view and changes in app.js
  add following code in app.js and contact.js
  create form in contact.jade file
  
var nodemailer = require('nodemailer');

on posting the form, use following code to submit the email

router.post('/send', function(req, res) {
  // create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'manishkk74@gmail.com',
          pass: ''
      }
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'Brad Trave<manishkk74@gmail.com>', // sender address
      to: 'support@mkgalaxy.com, manishkk74@gmail.com, naveenkhanchandani@gmail.com', // list of receivers
      subject: 'Website Submission', // Subject line
      text: 'You have a submission with the following details... Name: ' + req.body.name + ', Email: ' + req.body.email + ', Message: ' + req.body.message, // plaintext body
      html: '<p>You have a submission with the following details... </p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>' // html body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
          res.redirect('/');
      }
      console.log('Message sent: ' + info.response);
      res.redirect('/');
  
  });
});
