$(window).ready(function	()	{
    window.paceOptions = {
        startOnPageLoad: true,
        ajax: false, // disabled
        document: false, // disabled
        eventLag: false, // disabled
        elements: false,
        ajax: {
            trackMethods: ["GET", "POST"],
            trackWebSockets: false
        }
    };

    //Logout Confirmation
    $('#logoutConfirm').popup({
	pagecontainer: '.container',
	transition: 'all 0.3s'
    });
    
    //scroll to top of the page
    $("#scroll-to-top").click(function()	{
	$("html, body").animate({ scrollTop: 0 }, 600);
	return false;
    });
    
    //scrollable sidebar
    $('.scrollable-sidebar').slimScroll({
	height: '100%',
	size: '0px'
    });
    
    //Sidebar menu dropdown
    $('aside li').hover(
        function(){ $(this).addClass('open') },
        function(){ $(this).removeClass('open') }
    )
    
    //Toggle Menu
    $('#sidebarToggle').click(function()	{
	$('#wrapper').toggleClass('sidebar-display');
	$('.main-menu').find('.openable').removeClass('open');
	$('.main-menu').find('.submenu').removeAttr('style');
    });

    //show/hide menu
    $('#menuToggle').click(function()	{
	$('#wrapper').toggleClass('sidebar-hide');
	$('.main-menu').find('.openable').removeClass('open');
	$('.main-menu').find('.submenu').removeAttr('style');
    });	
    
    $(window).resize(function() {
	if (Modernizr.mq('(min-width: 768px)') && Modernizr.mq('(max-width: 868px)')) {
	    $('#wrapper').addClass('sidebar-mini').addClass('window-resize');
	    $('.main-menu').find('.openable').removeClass('open');
	    $('.main-menu').find('.submenu').removeAttr('style');
	}
	else if (Modernizr.mq('(min-width: 869px)'))	{
	    if($('#wrapper').hasClass('window-resize'))	{
		$('#wrapper').removeClass('sidebar-mini window-resize');
		$('.main-menu').find('.openable').removeClass('open');
		$('.main-menu').find('.submenu').removeAttr('style');
	    }
	}
	else	{
	    $('#wrapper').removeClass('sidebar-mini window-resize');
	    $('.main-menu').find('.openable').removeClass('open');
	    $('.main-menu').find('.submenu').removeAttr('style');
	}
    });
});

$(window).load(function() {
    //Stop preloading animation
    Pace.stop();
    
    // Fade out the overlay div
    $('#overlay').fadeOut(800);
    
    //$('body').removeAttr('class');
    $('body').removeClass('overflow-hidden pace-running');
    
    //Enable animation
    $('#wrapper').removeClass('preload');
    
    //Collapsible Active Menu
    if(!$('#wrapper').hasClass('sidebar-mini'))	{
	$('aside').find('.active.openable').children('.submenu').slideDown();
    }
});

$(window).scroll(function(){

    var position = $(window).scrollTop();

    //Display a scroll to top button
    if(position >= 200)	{
	$('#scroll-to-top').attr('style','bottom:8px;');	
    }
    else	{
	$('#scroll-to-top').removeAttr('style');
    }
});
