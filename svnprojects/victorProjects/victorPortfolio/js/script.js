$(function() {
  
  $(window).scroll(function () { 
    if ($(window).scrollTop() > 71) {
      $('nav').addClass('stick');
      $('#scroll-fix').removeClass('hidden');
    }
    if ($(window).scrollTop() < 72) {
      $('nav').removeClass('stick');
      $('#scroll-fix').addClass('hidden');
    }
  });
  
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 150) {
      $('#return-to-top').fadeIn(500);
    } else {
      $('#return-to-top').fadeOut(500);
    }
  });
  
  $('#return-to-top').click(function() {
    $('body, html').animate({
      scrollTop : 0
    }, 500);
  });
  
  function scroll_if_anchor(href) {
    href = typeof(href) == "string" ? href : $(this).attr("href");
    var fromTop = 43;
    if(href.indexOf("#") === 0) {
      var $target = $(href);
      if($target.length) {
        $('html, body').animate({ scrollTop: $target.offset().top - fromTop });
        if(history && "pushState" in history) {
          history.pushState({}, document.title, window.location.pathname + href);
          return false;
        }
      }
    }
  }
  
  scroll_if_anchor(window.location.hash);
  $("body").on("click", "a", scroll_if_anchor);
  
});