$(document).ready(function () {

    scrollPsy();
    carroselSegmentos();
    listGroup();

    $(window).on("load scroll", function () {
        scrollPsy();
        headerClass();
    });

});

function carroselSegmentos() {
    $("#segmentos .row").owlCarousel({
        autoplay: true,
        dots: false,
        nav: false,
        loop: true,
        responsiveClass: true,
        slideTransition: "linear",
        autoplayTimeout: 3000,
        autoplaySpeed: 10000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 3,
            },
            1024: {
                items: 6,
            },
        },
    });
}

function headerClass() {
    var top = $(window).scrollTop();
    if (top === 0) {
        $("body").addClass("scroll-top").removeClass("scroll-scrolled");
    } else {
        $("body").addClass("scroll-scrolled").removeClass("scroll-top");
    }
}

function scrollPsy() {
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
}

function listGroup() {
    $(".list-group .list-group-item").on("click", function (e) {
        e.preventDefault();
        $(".list-group .list-group-item").removeClass("active");
        $(this).addClass("active");
    });
}