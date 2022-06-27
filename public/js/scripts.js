$(document).ready(function () {
    headerClass();
    scrollPsy();
});

function headerClass() {
    $(window).on('scroll', function () {
        var top = $(window).scrollTop();
        if (top === 0) {
            $("body").addClass("scroll-top").removeClass("scroll-scrolled");
        } else {
            $("body").addClass("scroll-scrolled").removeClass("scroll-top");
        }
    });
}

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