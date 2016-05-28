// JavaScript Document

$( document ).ready(function() {
  function loadPage(page) {
    var request = $.ajax({
		  url: page,
		  method: "GET"
		});
		 
		request.done(function( data ) {
      console.log(data);
		  $('#results').html(data);
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  console.log( "Request failed: ", textStatus );
		  console.log( "jqXHR: ", jqXHR );
		});
  }


  $('#lnkHome').click(function() {
    loadPage('home.html');
  });
  $('#lnkAbout').click(function() {
    loadPage('about.html');
  });
  $('#lnkServices').click(function() {
    loadPage('services.html');
  });
  $('#lnkContact').click(function() {
    loadPage('contact.html');
  });
  
  
  loadPage('home.html');
});