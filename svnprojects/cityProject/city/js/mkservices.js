angular.module('myApp').service('mkServices', [function() {
    var ref = null;
    this.reference = null;
    this.firebaseUrl = function() {
        ref = new Firebase('https://mycontacts12.firebaseio.com/cities');
        this.reference = ref;
        return ref;   
    }
    this.firebaseUrl();
}]);