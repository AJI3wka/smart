$(document).ready(function() {


// device detection
var isMobile = false;
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
console.log('isMobile = ' + isMobile);



if (!isMobile) {

    $('.gallery_carousel_visual').find('img').each(function(index, el) {
        $(this).attr('src',$(this).attr('data-src'));
    });

}

    initFlexImageCarousel();
    initPopups();
    $('.main_carousel_holder').slick({
        fade: true,
        dots: true,
    });
    $('.gallery_carousel').slick({
        slidesToShow: 5,
        rows: 2,
        arrows: false,
        responsive: [{
            breakpoint: 1000,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 700,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 500,
            settings: {
                slidesToShow: 1
            }
        }]
    });
    $('.gallery_carousel a, .video_popup').fancybox({
        padding: '0',
    });
    $('.video_popup, .mini_fixed_pop a.visual').fancybox({
		padding : '0',
		'type' : 'iframe',
	});
    $('.reviews_carousel').slick({
        slidesToShow: 1,
    });
    $('.mini_fixed_pop .mini_close').click(function() {
        $('.mini_fixed_pop').addClass('close');
    });
    $('.burger_menu').on('click', function(e) {
        e.preventDefault();
        $('.burger_menu').toggleClass('open');
        $('nav').toggleClass('active');
        if (!$('nav').hasClass('active')) {
            $('nav>ul').slideUp(300);
        } else {
            $('nav>ul').slideDown(300);
        }
    });
    $(window).resize(function() {
        $('nav>ul>li').removeClass('active');
        $('.burger_menu').removeClass('open');
        $('nav').removeClass('active');
        $('nav ul').removeAttr('style');
    });
    $('a.anchor').click(function() {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top - $('.gen_nav_holder').outerHeight();
        $('html,body').animate({
            scrollTop: destination
        }, 800);
        return false;
    });
    $(window).scroll(function() {
        if ($(window).scrollTop() > $('.master_section').offset().top) {
            var height_nav = $('.gen_nav_holder').outerHeight();
            $('.gen_nav_wrapper').css({
                'height': height_nav
            });
            $('.gen_nav_holder').addClass('active');
        } else {
            $('.gen_nav_wrapper').removeAttr('style');
            $('.gen_nav_holder').removeClass('active');
        }
        if ($(window).scrollTop() > $('.characteristics_section').offset().top) {
            $('.mini_fixed_pop').addClass('open');
        }
    });
});

function initFlexImageCarousel() {
    $('.gallery_carousel_visual img').each(function() {
        $(this).closest('.gallery_carousel_visual').css({
            'background': 'url(' + $(this).attr('src') + ') no-repeat 50% 50%',
            'background-size': 'cover',
            'background-position': 'top'
        })
    });
};

function initPopups() {
    $('body').popup({
        "opener": ".top_order, .order_btn",
        "popup_holder": "#popup1",
        "popup": ".popup",
        "close_btn": ".close_popup"
    }).popup({
        "opener": ".call_back_btn",
        "popup_holder": "#popup2",
        "popup": ".popup",
        "close_btn": ".close_popup"
    }).popup({
        "opener": ".info_btn_1",
        "popup_holder": "#popup3",
        "popup": ".popup",
        "close_btn": ".close_popup"
    }).popup({
        "opener": ".info_btn_2",
        "popup_holder": "#popup4",
        "popup": ".popup",
        "close_btn": ".close_popup"
    }).popup({
        "opener": ".guarantee",
        "popup_holder": "#popup5",
        "popup": ".popup",
        "close_btn": ".close_popup"
    })
};
$.fn.popup = function(o) {
    var o = $.extend({
        "opener": ".call-back a",
        "popup_holder": "#call-popup",
        "popup": ".popup",
        "close_btn": ".btn-close",
        "close": function() {},
        "beforeOpen": function(popup) {
            $(popup).css({
                'left': 0,
                'top': 0
            }).hide();
        }
    }, o);
    return this.each(function() {
        var container = $(this),
            opener = $(o.opener, container),
            popup_holder = $(o.popup_holder, container),
            popup = $(o.popup, popup_holder),
            close = $(o.close_btn, popup),
            bg = $('.bg', popup_holder);
        popup.css('margin', 0);
        opener.click(function(e) {
            o.beforeOpen.apply(this, [popup_holder]);
            popup_holder.css('left', 0);
            popup_holder.fadeIn(400);
            alignPopup();
            bgResize();
            e.preventDefault();
        });

        function alignPopup() {
            var deviceAgent = navigator.userAgent.toLowerCase();
            var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/i);
            if (agentID) {
                if (popup.outerHeight() > window.innerHeight) {
                    popup.css({
                        'top': $(window).scrollTop(),
                        'left': ((window.innerWidth - popup.outerWidth()) / 2) + $(window).scrollLeft()
                    });
                    return false;
                }
                popup.css({
                    'top': ((window.innerHeight - popup.outerHeight()) / 2) + $(window).scrollTop(),
                    'left': ((window.innerWidth - popup.outerWidth()) / 2) + $(window).scrollLeft()
                });
            } else {
                if (popup.outerHeight() > $(window).outerHeight()) {
                    popup.css({
                        'top': $(window).scrollTop(),
                        'left': (($(window).width() - popup.outerWidth()) / 2) + $(window).scrollLeft()
                    });
                    return false;
                }
                popup.css({
                    'top': (($(window).height() - popup.outerHeight()) / 2) + $(window).scrollTop(),
                    'left': (($(window).width() - popup.outerWidth()) / 2) + $(window).scrollLeft()
                });
            }
        }

        function bgResize() {
            var _w = $(window).width(),
                _h = $(document).height();
            bg.css({
                "height": _h,
                "width": _w + $(window).scrollLeft()
            });
        }
        $(window).resize(function() {
            if (popup_holder.is(":visible")) {
                bgResize();
                alignPopup();
            }
        });
        if (popup_holder.is(":visible")) {
            bgResize();
            alignPopup();
        }
        close.add(bg).click(function(e) {
            var closeEl = this;
            popup_holder.fadeOut(400, function() {
                o.close.apply(closeEl, [popup_holder]);
            });
            e.preventDefault();
        });
        $('body').keydown(function(e) {
            if (e.keyCode == '27') {
                popup_holder.fadeOut(400);
            }
        })
    });
};