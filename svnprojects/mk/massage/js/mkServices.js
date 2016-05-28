angular.module('myApp').service('mkServices', ['$http', function($http) {

  this.refChainList = [];
  this.refDefaultUser = 'google:112913147917981568678';
  
  this.customize = {};
  
  this.refChain = function(ref, uid, callback) {
    var chain = [];
    var referrer = null;
    var s = null;
    var defaultUser = this.refDefaultUser;
    //first link
    ref.child('users').child(uid).once("value", function(snapshot) {
      s = snapshot.val();
      referrer = s.refBy || defaultUser;
      if (referrer) {
        chain[0] = referrer;
        console.log('level 1: ', referrer);
        //second link
        ref.child('users').child(referrer).once("value", function(snapshot) {
          s = snapshot.val();
          referrer = s.refBy || defaultUser;
          if (referrer) {
            chain[1] = referrer;
            console.log('level 2: ', referrer);
            //third link
            ref.child('users').child(referrer).once("value", function(snapshot) {
              s = snapshot.val();
              referrer = s.refBy || defaultUser;
              if (referrer) {
                chain[2] = referrer;
                console.log('level 3: ', referrer);
                //fourth link
                ref.child('users').child(referrer).once("value", function(snapshot) {
                  s = snapshot.val();
                  referrer = s.refBy || defaultUser;
                  if (referrer) {
                    chain[3] = referrer;
                    console.log('level 4: ', referrer);
                    callback(chain);
                  }
                });
                //fourth link ends
              }
            });
            //third link ends
          }
        });
        //second link ends
      }//end if referrer
    });
    //first link ends
  };


  //host checking
  this.host = function(host, callBack) {
    this.customize.host = host;
    switch (host) {
      case 'services1.mkgalaxy.com':
        this.customize.nav = 'nav/services.html';
        break;
      case 'doctor1.mkgalaxy.com':
        this.customize.nav = 'nav/doctor.html';
        break;
      case 'lawyer1.mkgalaxy.com':
        this.customize.nav = 'nav/lawyer.html';
        break;
      case 'tutor1.mkgalaxy.com':
        this.customize.nav = 'nav/tutor.html';
        break;
      case 'massage1.mkgalaxy.com':
        this.customize.nav = 'nav/massage.html';
        break;
      case 'buysell1.mkgalaxy.com':
        this.customize.nav = 'nav/buysell.html';
        break;
    }
    
    callBack(this.customize);
  };

}]);