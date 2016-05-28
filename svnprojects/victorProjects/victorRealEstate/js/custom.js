$(document).ready(function () {

	// Initiate Bootstrap Select
	$('.selectpicker').selectpicker();

    // Popover Demo
	$('.popover-demo a').popover();
	$('.popover-demo a').on('click', function(e) {e.preventDefault(); return true;});

    // Tooltip
	$('.link-action a').tooltip();
    $('.btn-icon').tooltip();
	$('.social-media a').tooltip();
    $('.filter-gridlist a').tooltip();

	// Initiate Advanced Search
	$('.adv-link').click(function() {

		$('.btn-search').toggleClass("switch");

		var $lefty = $('.advanced-search');
		$lefty.animate({
		left: parseInt($lefty.css('left'),10) == 0 ? - $lefty.outerWidth() : 0
		});

		return false
	});

    // Toggle Off-Canvas
    $('[data-toggle=offcanvas-sm]').click(function () {
        $('.row-offcanvas-sm').toggleClass('active');
        $('[data-toggle=offcanvas-sm]').toggleClass('active');
        $('.sidebar-offcanvas-sm').toggleClass('active');
    });

    $('[data-toggle=offcanvas]').click(function () {
        $('.site-row.row-offcanvas').toggleClass('active');
        $('[data-toggle=offcanvas]').toggleClass('active');
        $('.sidebar-offcanvas').toggleClass('active');
    });

});
