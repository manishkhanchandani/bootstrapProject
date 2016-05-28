angular.module('myApp').service('mkServices', ['localStorageService', function(localStorageService) {
    this.isLoggedIn = false;
    this.userData = {'id': '', 'name': '', 'img': '', 'provider': ''};
    this.reference = null;
    var ref = null;
    this.firebaseUrl = function() {
        ref = new Firebase('https://mycontacts12.firebaseio.com/meeton');
        this.reference = ref;
        return ref;   
    }
    this.firebaseUrl();
    this.loggedInUser = function() {
        console.log('inside logged in user service');   
    };
    this.currentUser = function() {
        return localStorageService.get('userData'); 
    };
    this.clearCurrentUser = function() {
        localStorageService.remove('userData');
    };
    this.list = function(instance, returnVar, loc) {
        var rec = returnVar.val();
        rec.distance = -1;
        if (loc) {
            rec.distance = this.distance(loc.lat, loc.lng, rec.location.lat, rec.location.lng, "M");
        }
        if (!rec.imageURL) rec.imageURL = 'http://webnoh.alsa.org/images/content/pagebuilder/192082.jpg';
        instance.push(rec);
    };
    this.distance = function (lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    };
}]);