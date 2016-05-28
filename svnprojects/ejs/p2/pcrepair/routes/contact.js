var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});


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

module.exports = router;
