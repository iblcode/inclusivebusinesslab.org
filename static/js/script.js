ibl = {
  milestones:function(){
    var max = 0;
    $(".ml-item-content").height('auto').each(function(){
      max = Math.max(max, $(this).height())
    }).height(max)
  },
  paralax: function() {
    $(window).on('scroll load resize', function() {
      $(".hero-layer.paralax").each(function() {
        var pos = ($(window).scrollTop() - $(this).parent().offset().top) / 2;
        var transform = ibl.transform();
        if (transform != '') {
          $(this).css(transform, 'translateY(' + pos + 'px)');
        } else {
          $(this).css('top', pos);
        }
      })
    })
  },
  transform: function() {
    if (!!this._transform) {
      return this._transform;
    }
    this._transform = '';
    var prefixes = [
        'transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'
      ],
      test = document.createElement('div'),
      i = 0,
      l = prefixes.length;
    for (; i < l; i++) {
      if (test.style[prefixes[i]] !== undefined) {
        this._transform = prefixes[i];
        break;
      }
    }
    return this._transform;
  },
  setVTitle: function() {
    var win = $(window),
      stop = win.scrollTop(),
      titleLayers = $(".hero-layer-text-v");
    $(".hero-home .hero-layer-text").each(function() {
      var el = $(this);
      el.css({height: win.height()})
    });
    if (stop > $(".hero-home").height() - 400) {
      titleLayers.each(function() {
        $(this).parent().removeClass('active')
      })
    } else if (stop > 100) {
      titleLayers.eq(0).parent().removeClass('active')
      titleLayers.eq(1).parent().addClass('active')
    } else {
      titleLayers.eq(1).parent().removeClass('active')
      titleLayers.eq(0).parent().addClass('active')
    }
  },
  homeHero: function() {
    $(".hero-home").height($(window).height())
    $(".hero-100").height($(window).height())
    $(window).on('load resize scroll', function() {
      $(".hero-home").height($(window).height());
      $(".hero-100").height($(window).height())
      ibl.setVTitle()
    });
    this.setVTitle();
  },
  init: function() {
    ibl.paralax();
    ibl.homeHero();
    ibl.mobileMenu();
    ibl.teamSlider();
    ibl.milestones();
    ibl.isotope.init();
    ibl.iblvideo();
    // ibl.proportionBox('.square-images > div', '1:1');
    ibl.proportionBox('.ibl-video', '930:520');
    $(window).on('load resize', function() {
      // ibl.proportionBox('.square-images > div', '1:1');
      ibl.proportionBox('.ibl-video', '930:520');
    });
  },
  mobileMenu: function() {
    $("#main-menu").append('<span id="mobile-menu"><span></span><span></span><span></span></span>');
    $("#mobile-menu").on('click', function() {
      $(this).parent().toggleClass('mobile-active')
    });
    $(document.body).on('click', function(e) {
      if (e.target.id !== 'main-menu' && $(e.target).parents('#main-menu').length === 0) {
        $("#main-menu").removeClass('mobile-active')
      }
    })
  },
  proportionBox: function(selector, proportion) {
    var prop = proportion.split(':');
    $.each(prop, function(i) {
      prop[i] = parseInt(prop[i], 10);
    });
    prop[0] = prop[0] / prop[1]
    $(selector).each(function() {
      $(this).height($(this).width() / prop[0])
    });
  },
  isotope: {
    buildMenu: function(root) {
      if ($(root).attr('data-nomenu') == 'true') {
        return '';
      }
      var menu = '<div class="isotope-menu"><nav><span data-filter="*" class="active">All</span>';
      var arr = [];
      $('[data-type]', root).each(function() {
        var items = $.trim($(this).attr('data-type')).split(',');
        $.each(items, function() {
          arr.push($.trim(this));
        })
      });
      arr = arr.filter(function(value, index, self) {
        return self.indexOf(value) === index;
      });
      arr.sort();
      $.each(arr, function() {
        menu += '<span data-filter="' + this + '">' + this + '</span>';
      });
      menu += '</nav></div>';
      return menu;
    },
    init: function() {
      $(".isotope2").each(function(i, el) {
        $(el).find('.isotope-item-v').each(function(ii, elem) {
          if (elem.querySelector('[data-date]').dataset.date > Math.floor(Date.now() / 1000)) {
            console.log(elem)
            $(elem).addClass('upcomming')
            elem.dataset.type = 'Upcoming'
          }
        })
      })
      $(".isotope,.isotope2").each(function() {
        $( ".isotope-item:lt(10)", this).addClass('active');
        var scope = $(this);
        this._isocurr = 10;
        this._pause = false;
        var menuString = ibl.isotope.buildMenu(this);
        $(this).prepend(menuString);
        var $grid = this._grid = $('.isotope-content', this).isotope({itemSelector: '.isotope-item, .isotope-item-v', layoutMode: 'packery'});
        $(".isotope-menu span", this).on('click', function() {
          if (!$(this).hasClass('active')) {
            var type = $(this).attr('data-filter');
            var selector = type == '*'
              ? '[data-type]'
              : '[data-type*="' + type + '"]'
            $grid.isotope({filter: selector});
            $(".isotope-menu span.active", scope).removeClass('active');
            $(this).addClass('active');
          }

        })
        $(window).on('resize scroll', function(){
          if(scope[0]._pause==false){
            scope[0]._pause = true;
           if($(this).scrollTop() >= scope.offset().top-$(this).height()/2) {
                scope[0]._isocurr += 10;
                $( ".isotope-item:lt("+scope[0]._isocurr+")", scope[0]).addClass('active');
                scope[0]._grid.isotope('layout');
            }
            setTimeout(function(){
              scope[0]._pause = false;
            }, 700)
          }

        })

      });
    }
  },
  iblvideo: function() {
    // $(".ibl-video").each(function() {
    //   $(this).on('click', function() {
    //     if (!this.__done) {
    //       this.__done = true;
    //       $(this).html($(this).find('[type="ibl/video"]').html()).addClass('active');
    //     }
    //   })
    // })
  },
  teamSlider: function() {
    $(".t-slider-holder").each(function() {
      $(this).slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        centerMode: true,
        prevArrow: '<span class="slick-prev"><span></span></span>',
        nextArrow: '<span class="slick-next"><span></span></span>',
        responsive: [
          {
            breakpoint: 1140,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
            }
          }, {
            breakpoint: 910,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }, {
            breakpoint: 700,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }, {
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

$(document).ready(function() {
  $(document.body).addClass('is-touchscreen-' + ('ontouchstart' in window || !!navigator.maxTouchPoints));

  $(".is-touchscreen-true .current-language").on('click', function() {
    $(this).parent().toggleClass('active')
  });

  $("#hero-arrow").on('click', function() {
    $("body,html").animate({scrollTop: $("#hero").height()})
  });
  $(window).on('load', function() {
    setInterval(function(){
      var max = 0;
      $(".inv-item-content p").height('auto').each(function(){
        var h = $(this).outerHeight();
        if(h > max){
          max = h;
        }
      }).each(function(){ this.style.height = max + 'px'; })

    }, 777)
    $(".inv-item-content p.medium-editor-element").on('keydown', function(e){
      if(e.keyCode === 13){
        e.preventDefault();
        document.execCommand('insertHTML', false, '<br>');
      }
    });
  });
  $(window).on('load resize', function() {
    $(".chk-content").each(function() {
      var el = $(this);
      el.height(el.parent().height());
    })
  });

  // $(".post-inner-date").each(function() {
  //   var el = $(this);
  //   el.css('marginLeft', -el.outerWidth() / 2)
  // })

  // $(".team-list li").on('click', function() {
  //   $(this).toggleClass('active');
  // })

  ibl.init()

  $(function() {
    $('.eqHeight').matchHeight();
  });

  // ++++++++++++++

  function bodyOverflow() {
    if ($(".member-info:visible").length) {
      $('body').css('overflow', 'hidden');
    } else {
      $('body').css('overflow', 'auto');
    }
  };

  $.fn.appear = function() {
    $(this).addClass('js-visible');
  };

  $.fn.disappear = function() {
    $(this).removeClass('js-visible');
  };

  $('.team-member:not(.small .team-member)').not('.js-visible').click(function() {
    $('.team-member').disappear();
    $(this).appear();
    bodyOverflow();
  });

  $('.info-close').click(function() {
    $('.team-member').disappear();
    bodyOverflow();
    return false;
  });

});
