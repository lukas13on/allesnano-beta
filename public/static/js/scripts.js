$(document).ready(function () {

    navbarFixes();
    smothAnchor();
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
        $(document.body).addClass("scroll-top").removeClass("scroll-scrolled");
    } else {
        $(document.body).addClass("scroll-scrolled").removeClass("scroll-top");
    }
}

function scrollPsy() {
    var currentTop = $(window).scrollTop();
    var padTop = parseInt($(".navbar").css("padding-top"));
    var padBot = parseInt($(".navbar").css("padding-top"));
    var navHeader = $(".navbar-header").height();
    var headerTop = navHeader + padBot + padTop;
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
        if (!$(this).hasClass("active")) {
            $(".list-group .list-group-item").removeClass("active");
            $(".list-group .list-group-item .content").slideUp();
            $(this).find(".content").delay(100).slideDown();
            $(this).delay(100).addClass("active");
        }
    });
}

function smothAnchor() {
    window.onhashchange = function (e) {
        e.preventDefault();
        return;
    };
    $('a[href*="#"][data-smoth="true"]').click(function (e) {
        e.preventDefault();
        var id = $(this).attr("href").replace("#", "");
        var el = $("#" + id);
        var padTop = parseInt($(".navbar").css("padding-top"));
        var padBot = parseInt($(".navbar").css("padding-top"));
        var navHeader = $(".navbar-header").height();
        var headerTop = navHeader + padBot + padTop;
        var fixHeaderTop = 10;
        if ($(document.body).hasClass("scroll-top")) {
            headerTop = headerTop - 30;
        }
        headerTop = headerTop - fixHeaderTop;
        var elTop = el.offset().top - headerTop;
        elTop = elTop < 0 ? 0 : elTop;
        scrollSmoth(elTop, "slow", "linear", function () {
            window.history.pushState({}, "", "#" + id);
        });
    });
}

function scrollSmoth(offset, delay, transition, callback) {
    $([document.documentElement, document.body]).animate({
        scrollTop: offset
    }, delay, transition, callback);
}

function navbarFixes() {
    $(".navbar .nav-link").on("click", function () {
        $("#navegacao").collapse("hide");
    });

    $('#navegacao').on('hide.bs.collapse', function () {
        $(document.body).removeClass("over-menu");
    });

    $('#navegacao').on('show.bs.collapse', function () {
        $(document.body).addClass("over-menu");
    });
}