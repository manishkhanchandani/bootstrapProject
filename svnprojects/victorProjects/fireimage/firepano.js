var firebaseRef = 'https://fireimage.firebaseio.com/';

function handleFileSelect(evt) {
  var f = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = (function(theFile) {
    return function(e) {
      var filePayload = e.target.result;
      // Generate a location that can't be guessed using the file's contents and a random number
      var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
      var f = new Firebase(firebaseRef + 'pano/' + hash + '/filePayload');
      f.set(filePayload, function() { 
        document.getElementById("pano").src = e.target.result;
        $('#file-upload').hide();
        // Update the location bar so the URL can be shared with others
        window.location.hash = hash;
      });
    };
  })(f);
  reader.readAsDataURL(f);
}

$(function() {

  var idx = window.location.href.indexOf('#');
  var hash = (idx > 0) ? window.location.href.slice(idx + 1) : '';
  if (hash === '') {
    // No hash found, so render the file upload button.
    $('#file-upload').show();
    document.getElementById("file-upload").addEventListener('change', handleFileSelect, false);
  } else {
    // A hash was passed in, so let's retrieve and render it.
    var f = new Firebase(firebaseRef + '/pano/' + hash + '/filePayload');
    f.once('value', function(snap) {
      var payload = snap.val();
      if (payload != null) {
        document.getElementById("pano").src = payload;
      } else {
        $('#body').append("Not found");
      }
    });
  }
});
