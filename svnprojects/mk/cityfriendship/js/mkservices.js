angular.module('myApp').service('mkServices', ['$http', function($http) {
    this.reference = null;
    var ref = null;
    this.firebaseUrl = function() {
        ref = new Firebase('https://mycontacts12.firebaseio.com/cityFriendship');
        this.reference = ref;
        return ref;   
    }
    this.firebaseUrl();
	this.getLocationData = function(url, callback) {
		this.reference.child('locations').child(btoa(url))
			.once('value', function(snapshot) {
				var a = snapshot.hasChildren();
				if (a) {
					callback(snapshot.val());
				} else {
					callback();
				}
			});
	};
	this.dropMenuChange = function() {
		$('.dropmenu').click(function(e){
			e.preventDefault();
			$(this).parent().find('ul').slideToggle();
		});	
	};
	this.minimize = function() {
		$('.btn-minimize').click(function(e){
			e.preventDefault();
			var $target = $(this).parent().parent().next('.box-content');
			if ($target.is(':visible')) $('i',$(this)).removeClass('chevron-up').addClass('chevron-down');
			else $('i',$(this)).removeClass('chevron-down').addClass('chevron-up');
			$target.slideToggle();
		});
	};
	this.closebtn = function() {
		$('.btn-close').click(function(e){
			e.preventDefault();
			$(this).parent().parent().parent().fadeOut();
		});
	};
	this.settingsbtn = function(id) {
		$('.btn-setting').click(function(e){
			e.preventDefault();
			$('#'+id).modal('show');
		});	
	};
	this.dataTable = function () {
		$('.datatable').dataTable({
			"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'i><'span12 center'p>>",
			"sPaginationType": "bootstrap",
			"oLanguage": {
			"sLengthMenu": "_MENU_ records per page"
			}
		} );	
	};
    this.list = function(instance, returnVar, loc) {
        var rec = returnVar.val();
        rec.distance = -1;
        if (loc) {
            rec.distance = this.distance(loc.lat, loc.lng, rec.latitude, rec.longitude, "M");
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
    this.getMoreListings = function(location, q, start, callback) {
        //api/fetch.php?location=san+francisco,%20ca,%20us&q=php+$150,000&start=0
        var url = 'api/fetch.php?location='+encodeURIComponent(location)+'&q='+encodeURIComponent(q)+'&start='+start;
        $http({
      method: 'GET',
      url: url
    }).then(function successCallback(response) {
        console.log('success call back');
        console.log(response);
        callback(response.data.data.totalresults);
      }, function errorCallback(response) {
        console.log('error call back');
        console.log(response);
      });    
    }
}]);