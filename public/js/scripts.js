$(document).ready(function () {
    scrollPsy();
});

function scrollPsy() {
    $(window).on('scroll', function () {
        var currentTop = $(window).scrollTop();
        var headerTop = $("header").outerHeight();
        var elems = $('section[id]');
        elems.each(function (index) {
            var elemTop = $(this).offset().top - headerTop;
            var elemBottom = elemTop + $(this).outerHeight();
            var id = $(this).attr('id');
            var navLink = $('.navbar-nav .nav-item a[href="#' + id + '"]');
            if (currentTop >= elemTop && currentTop <= elemBottom) {
                navLink.parent().addClass('active');
            } else {
                navLink.parent().removeClass('active');
            }
        });
    });
}