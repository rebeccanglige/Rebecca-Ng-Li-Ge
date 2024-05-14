
!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 31;
  if (window.matchMedia("(max-width: 991px)").matches) {
    scrolltoOffset += 30;
  }
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      e.preventDefault();
      if (target.length) {

        var scrollto = target.offset().top - scrolltoOffset;
        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');
    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });
    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });
    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
        
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('.icofont-navigation-menu').addClass('colored-icon');
    } else {
      $('#header').removeClass('header-scrolled');
      $('.icofont-navigation-menu').removeClass('colored-icon');
    }
  });
  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');
      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);


const root = document.documentElement;
function updateColors(num) {
  if (num === 1){
    root.style.setProperty('--primary-color', 'rgb(76, 0, 39)');
    root.style.setProperty('--primary-color-background', 'rgba(76, 0, 39, 0.8)');
    root.style.setProperty('--primary-color-hover', 'rgb(132, 60, 97)');
    root.style.setProperty('--primary-color-font', 'rgb(76, 0, 39)');
    root.style.setProperty('--primary2-color-font', 'rgb(76, 0, 39)');
    root.style.setProperty('--primary3-color-font', '#444444');
    root.style.setProperty('--font-color', '#fff');
    root.style.setProperty('--font-color-hover', '#fff');
  }else if (num === 2){
    root.style.setProperty('--primary-color', 'rgb(14, 131, 136)');
    root.style.setProperty('--primary-color-background', 'rgba(14, 131, 136, 0.8)');
    root.style.setProperty('--primary-color-hover', 'rgb(17, 96, 99)');
    root.style.setProperty('--primary-color-font', 'rgb(14, 131, 136)');
    root.style.setProperty('--primary2-color-font', 'rgb(14, 131, 136)');
    root.style.setProperty('--primary3-color-font', '#444444');
    root.style.setProperty('--font-color', '#fff');
    root.style.setProperty('--font-color-hover', '#fff');
  }else if (num === 3){
    root.style.setProperty('--primary-color', 'rgb(25, 55, 109)');
    root.style.setProperty('--primary-color-background', 'rgba(25, 55, 109, 0.8)');
    root.style.setProperty('--primary-color-hover', 'rgb(17, 31, 56)');
    root.style.setProperty('--primary-color-font', 'rgb(25, 55, 109)');
    root.style.setProperty('--primary2-color-font', 'rgb(25, 55, 109)');
    root.style.setProperty('--primary3-color-font', '#444444');
    root.style.setProperty('--font-color', '#fff');
    root.style.setProperty('--font-color-hover', '#fff');
  }else if (num === 4){
    root.style.setProperty('--primary-color', 'rgb(82, 85, 85)');
    root.style.setProperty('--primary-color-background', 'rgba(82, 85, 85, 0.8)');
    root.style.setProperty('--primary-color-hover', 'rgb(127, 128, 128)');
    root.style.setProperty('--primary-color-font', 'rgb(82, 85, 85)');
    root.style.setProperty('--primary2-color-font', 'rgb(82, 85, 85)');
    root.style.setProperty('--primary3-color-font', '#444444');
    root.style.setProperty('--font-color', '#fff');
    root.style.setProperty('--font-color-hover', '#fff');
  }
}
const button1 = document.getElementById('button1');
console.log(button1);
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');

button1.addEventListener('click', () => updateColors(1));
button2.addEventListener('click', () => updateColors(2));
button3.addEventListener('click', () => updateColors(3));
button4.addEventListener('click', () => updateColors(4));