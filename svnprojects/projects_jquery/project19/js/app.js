// JavaScript Document
//google:112913147917981568678


$(document).on("keypress", 'form', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        var str = e.target.className;
        var n = str.indexOf("addressBox");
        if (n === -1) {
          return true;
        } else {
          return false;
        }
        return true;
    }
});

$( document ).ready(function() {
  
  //date time picker
  $('#dob').datetimepicker({
    formatTime:'H:i',
	  formatDate:'Y-m-d',
    format:'Y-m-d H:i',
    step:10
  });
  //date time picker ends
  
  function loadURL(url, callback) {
    console.log('url is ', url);
    var request = $.ajax({
		  url: url,
		  method: "GET"
		});
		 
		request.done(function( data ) {
      console.log('data is ', data);
		  callback(data);
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  console.log( "Request failed: ", textStatus );
		  console.log( "jqXHR: ", jqXHR );
		});
  }
  
  function postURL(url, postData, callback) {
    console.log('url is ', url);
    var request = $.ajax({
		  url: url,
		  method: "POST",
      data: postData
		});
		 
		request.done(function( data ) {
      console.log('data is ', data);
		  callback(data);
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  console.log( "Request failed: ", textStatus );
		  console.log( "jqXHR: ", jqXHR );
		});
  }

  //loadURL('/svnprojects/horo/api.php?action=cityMatch&lat='+lat+'&lng='+lng, birthProfileResult);
  function birthProfileResult(res) { 
   //var data = jQuery.parseJSON(res);
   var data = res;
   var frm = {};
   frm.data = {
      name: $('#name').val(),
      email: $('#email').val(),
      password: btoa($('#password').val()),
      img: $('#img').val(),
      birthplace: $('#birthplace').val(),
      birthLat: $('#birthLat').val(),
      birthLng: $('#birthLng').val(),
      birthmonth: $('#birthmonth').val(),
      birthday: $('#birthday').val(),
      birthyear: $('#birthyear').val(),
      birthhour: $('#birthhour').val(),
      birthminute: $('#birthminute').val(),
      dst: data.data.dst,
      lat_h: data.data.lat_h,
      lat_m: data.data.lat_m,
      lat_s: data.data.lat_s,
      lon_e: data.data.lon_e,
      lon_h: data.data.lon_h,
      lon_m: data.data.lon_m,
      latitude: data.data.latitude,
      longitude: data.data.longitude,
      zone_h: data.data.zone_h,
      zone_m: data.data.zone_m
    };
    var url = '/svnprojects/mk/api/fetch.php?saveIP=1&action=update&path=/horo/profiles/'+btoa($('#email').val())
    postURL(url, frm, formProfileSubmitted);
  }
  
  
  function clearFormProfile() {
    $('#name').val('');
    $('#email').val('');
    $('#password').val('');
    $('#img').val('');
    $('#birthplace').val('');
    $('#birthLat').val('');
    $('#birthLng').val('');
    $('#birthmonth').val('');
    $('#birthday').val('');
    $('#birthyear').val('');
    $('#birthhour').val('');
    $('#birthminute').val('');
  }
  
  function formProfileSubmitted(data) {
    $('#errorProfile').html('Profile Created Successfully');
    $('#errorProfile').fadeOut(5000);
    clearFormProfile();
    
  }
 
  $('#formProfile').submit(function(event) {
    event.preventDefault();
    $('#errorProfile').show();
    $('#errorProfile').html('Processing.... Please wait!');
    if ($('#birthLat').val() == '') {
      console.log('empty lat');
      $('#errorProfile').html('Empty latitude');
      return false; 
    }
    if ($('#birthLng').val() == '') {
      console.log('empty lng');
      $('#errorProfile').html('Empty longitude');
      return false; 
    }
    loadURL('/svnprojects/horo/api.php?action=cityMatch&lat='+$('#birthLat').val()+'&lng='+$('#birthLng').val(), birthProfileResult);
  });
  
  
  function showProfileResult(data) {
    console.log(data.arr);
    
  }
  
  $('#btnShowProfile').on( "click", function() {
    loadURL('/svnprojects/mk/api/fetch.php?action=get&path=/horo/profiles', showProfileResult);
  });
  
});