
ibl = {
    paralax:function(){
        $(window).on('scroll load resize', function(){
            $(".hero-layer.paralax").each(function(){
                var pos = ($(window).scrollTop() - $(this).parent().offset().top)/2;
                var transform = ibl.transform();
                if(transform != ''){
                    $(this).css(transform, 'translateY('+pos+'px)');
                }
                else{
                    $(this).css('top', pos);
                }
            })
        })
    },
    transform : function(){
        if(!!this._transform){
            return this._transform;
        }
        this._transform = '';
        var prefixes = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'],
            test = document.createElement('div'), i = 0, l = prefixes.length;
            for( ; i < l; i++) {
                if(test.style[prefixes[i]] !== undefined) {
                    this._transform = prefixes[i];
                    break;
                }
            }
            return this._transform;
    },
    setVTitle:function(){
        var win = $(window), stop = win.scrollTop(), titleLayers = $(".hero-layer-text-v");
        $(".hero-home .hero-layer-text").each(function(){
            var el = $(this);
            el.css({
                top:stop,
                height:win.height()
            })
        });
        if(stop > $(".hero-home").height() - 400){
            titleLayers.removeClass('active')
        }
        else if(stop > 100){
            titleLayers.eq(0).removeClass('active')
            titleLayers.eq(1).addClass('active')
        }
        else{
            titleLayers.eq(1).removeClass('active')
            titleLayers.eq(0).addClass('active')
        }
    },
    homeHero:function(){
        $(".hero-home").height($(window).height()*1.5)
        $(".hero-100").height($(window).height())
        $(window).on('load resize scroll', function(){
            $(".hero-home").height($(window).height()*1.5);
            $(".hero-100").height($(window).height())
            ibl.setVTitle()
        });
        this.setVTitle();
    },
    init:function(){
        ibl.paralax();
        ibl.homeHero();
        ibl.mobileMenu();
        ibl.teamSlider();
        ibl.isotope.init();
        ibl.iblvideo();
        ibl.proportionBox('.square-images > div', '1:1');
        ibl.proportionBox('.ibl-video', '930:520');
        $(window).on('load resize', function(){
            ibl.proportionBox('.square-images > div', '1:1');
            ibl.proportionBox('.ibl-video', '930:520');
        })
    },
    mobileMenu:function(){
        $("#main-menu").append('<span id="mobile-menu"><span></span><span></span><span></span></span>');
        $("#mobile-menu").on('click', function(){
            $(this).parent().toggleClass('mobile-active')
        });
        $(document.body).on('click', function(e){
            if(e.target.id !== 'main-menu' && $(e.target).parents('#main-menu').length === 0){
                $("#main-menu").removeClass('mobile-active')
            }
        })
    },
    proportionBox:function(selector, proportion){
        var prop = proportion.split(':');
        $.each(prop, function(i){
            prop[i] = parseInt(prop[i], 10);
        });
        prop[0] = prop[0]/prop[1]
        $(selector).each(function(){
            $(this).height($(this).width()/prop[0])
        });
    },
    isotope:{
        buildMenu:function(root){
            if($(root).attr('data-nomenu') == 'true'){
                return '';
            }
            var menu = '<div class="isotope-menu"><nav><span data-filter="*" class="active">All</span>';
            var arr = [];
            $('[data-type]', root).each(function(){
                var items = $.trim($(this).attr('data-type')).split(',');
                $.each(items, function(){
                    arr.push($.trim(this));
                })
            });
            arr = arr.filter(function(value, index, self){
                return self.indexOf(value) === index;
            });
            arr.sort();
            $.each(arr, function(){
                menu += '<span data-filter="'+this+'">'+this+'</span>';
            });
            menu += '</nav></div>';
            return menu;
        },
        init:function(){
            $(".isotope,.isotope2").each(function(){
                var scope = $(this);
                var menuString = ibl.isotope.buildMenu(this);
                $(this).prepend(menuString);
                var $grid = $('.isotope-content', this).isotope({
                    itemSelector: '.isotope-item, .isotope-item-v',
                    layoutMode: 'packery',
                });
                $(".isotope-menu span", this).on('click', function(){
                    if(!$(this).hasClass('active')){
                        var type = $(this).attr('data-filter');
                        var selector = type == '*' ? '[data-type]' : '[data-type*="'+type+'"]'
                        $grid.isotope({ filter: selector  });
                        $(".isotope-menu span.active", scope).removeClass('active');
                        $(this).addClass('active');
                    }

                })
            });
        }
    },
    iblvideo:function(){
        $(".ibl-video").each(function(){
            $(this).on('click', function(){
                if(!this.__done){
                    this.__done = true;
                    $(this)
                        .html($(this).find('[type="ibl/video"]').html())
                        .addClass('active');
                }
            })
        })
    },
    teamSlider:function(){
        $(".t-slider-holder").each(function(){
            $(this).slick({
                slidesToShow: 5,
                slidesToScroll: 5,
                infinite:true,
                prevArrow:'<span class="slick-prev"><span></span></span>',
                nextArrow:'<span class="slick-next"><span></span></span>',
                responsive: [
                    {
                        breakpoint: 1140,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4
                        }
                    },
                    {
                        breakpoint: 910,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 700,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            })
        })
    }
}


$(document).ready(function(){
    $(document.body).addClass('is-touchscreen-' + ('ontouchstart' in window || !!navigator.maxTouchPoints));

    $(".is-touchscreen-true .current-language").on('click', function(){
        $(this).parent().toggleClass('active')
    });

    $("#hero-arrow").on('click', function(){
        $("body,html").animate({scrollTop:$("#hero").height()})
    });
    $(window).on('load', function(){

    });
    $(window).on('load resize', function(){
        $(".chk-content").each(function(){
            var el = $(this);
            el.height(el.parent().height());
        })
    });
    $(".post-inner-date").each(function(){
        var el = $(this);
        el.css('marginLeft', -el.outerWidth()/2)
    })

   $(".team-list li").on('click', function(){
       $(this).toggleClass('active');
   })

    ibl.init()

});