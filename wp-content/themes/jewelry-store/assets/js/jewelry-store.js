jQuery(document).ready(function($){

	'use strict';

    // Owl Carousel

	function ThemeOwlCaousel($elem) {
        $elem.owlCarousel({
            rtl: $("html").attr("dir") == 'rtl' ? true : false,
            items: $elem.data("collg"),
            margin: $elem.data("itemspace"),
            loop: $elem.data("loop"),
            center: $elem.data("center"),
            thumbs: false,
            thumbImage: false,
            autoplay: $elem.data("autoplay"),
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            smartSpeed: $elem.data("smartspeed"),
            dots: $elem.data("dots"),
            nav: $elem.data("nav"),
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
            responsive: {
                0: {
                    items: $elem.data("colxs"),
                },
                768: {
                    items: $elem.data("colsm"),
                },
                992: {
                    items: $elem.data("colmd"),
                },
                1200: {
                    items: $elem.data("collg"),
                }
            },
        });
    }

    if ($('.owl-carousel').length) {
        $('.owl-carousel').each(function() {
            new ThemeOwlCaousel($(this));
        });
    }

    // End Owl Carousel

    // Sticky Menu

	jQuery(window).scroll(function(){
        if (jQuery(window).scrollTop() >= 100) {
            jQuery('.is_sticky').addClass('sticky_fixed');
        } else {
            jQuery('.is_sticky').removeClass('sticky_fixed');
        }
    });

    // End Sticky Menu
    
    // Parallax 

    $('.section_bg_container').parallax();

    // End Parallax

    // Back To Top 

    $(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back_to_top').fadeIn();
		} else {
			$('.back_to_top').fadeOut();
		}
	});

	$('.back_to_top').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});

  // End Back To Top

  // Compare count add and remove function

  jQuery(document)
          .on( 'click', '.product a.compare:not(.added)', function(e){
            e.preventDefault();
                jQuery.ajax({
                    type: 'POST',
                    url: yith_woocompare.ajaxurl.toString().replace( '%%endpoint%%', 'yith_woocompare_add_count' ),
                    data: {
                      action: 'yith_woocompare_add_count'
                    },
                    dataType: 'json',
                    success: function(data){
                      jQuery('.compare-value').html(data);
                    }
                });
          })
          .on('click', '.yith-woocompare-widget li a.remove, .yith-woocompare-widget a.clear-all', function (e) {
            e.preventDefault();
            jQuery.ajax({
                  type: 'POST',
                  url: yith_woocompare.ajaxurl.toString().replace( '%%endpoint%%', 'yith_woocompare_update_count' ),
                  data: {
                    action: 'yith_woocompare_update_count'
                  },
                  dataType: 'json',
                  success: function(data){
                    jQuery('.compare-value').html(data);
                  }
              });
          });
    
});


/* Wow Init */

new WOW({
  boxClass:     'wow',
  animateClass: 'animated',
  offset:       100,
  mobile: true,
  live: true
}).init();

/* End Wow Init */


/* Mobile Menus */

const mobileMenuButtons = document.querySelectorAll('[data-mobile-menu-target]')
const closeMobileButtons = document.querySelectorAll('[mobile-menu-close]')
const menuAddExpendButtonsLinks = document.querySelectorAll('.main-menu-list .menu-item-has-children > a')
const menuExpendButtons = document.querySelectorAll('[data-menu-expend]')
let targetContainerID;

mobileMenuButtons.forEach( button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const modal = document.querySelector(button.dataset.mobileMenuTarget)
          targetContainerID = modal.id;
    if(document.querySelector(button.dataset.mobileMenuTarget).classList.contains('active')){
      closeModal(modal)
    }else{
      openModal(modal)
    }
  })
})

closeMobileButtons.forEach( button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const modal = button.closest('.mobile-menu-container')
    closeModal(modal)
    document.querySelector('[data-mobile-menu-target]').focus()
  })
})

menuAddExpendButtonsLinks.forEach( links => {
    var button = document.createElement('button');
        button.className = 'btn menu-expend';
        button.setAttribute('data-menu-expend','data-menu-expend');
        button.innerHTML='<i class="fa fa-plus"></i>';
        links.appendChild(button);

        button.addEventListener('click', (event) => {
            event.preventDefault();
            const parentLi = button.closest('li')
            parentLi.classList.toggle('open')
            if(parentLi.classList.contains('open')){
              button.innerHTML = '<i class="fa fa-minus"></i>'
            }else{
              button.innerHTML = '<i class="fa fa-plus"></i>'
            }
        })
})

menuExpendButtons.forEach( button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const parentLi = button.closest('li')
    parentLi.classList.toggle('open')
    if(parentLi.classList.contains('open')){
      button.innerHTML = '<i class="fa-solid fa-minus"></i>'
    }else{
      button.innerHTML = '<i class="fa-solid fa-plus"></i>'
    }
  })
})

document.querySelector('.mobile-menu-container-overlay').addEventListener('click', (event) => {
  document.querySelector('.mobile-menu-container').classList.remove('active')
  document.querySelector('[data-mobile-menu-target]').focus()
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
}

/* End Mobile Menus */