$(document).ready(function() {

  //// hide/show top-menu on scroll
  var prev = 0;
  var $window = $(window);
  var nav = $('.top-menu');

  $window.on('scroll', function(){
    var scrollTop = $window.scrollTop();
    nav.toggleClass('hidden', scrollTop < prev);
    if(scrollTop==0){
      nav.removeClass('hidden');
    }
    prev = scrollTop;
  });

  hideLoader();

  function hideLoader(){
    var loader= $('.loader-overlayer');
    loader.addClass('hide-loader');
  }

  ////Modal/////

  var modal = $('#myModal');
  var modalButton = $(".modalButton");
  var span = $(".close");
  var showModal= false;

  modalButton.click(function(e) {
      setTimeout(function(){modal.addClass('show-modal')}, 0);
      $('.body-wrapper').addClass('scale-body-wrapper');
      $('body').addClass('no-scroll');
      showModal= true;
      nav.removeClass('hidden');
    // fillModal(e);
  });

  span.click(function() {
    modal.removeClass('show-modal');
    setTimeout(function(){$('.body-wrapper').removeClass('scale-body-wrapper')}, 0);
    $('body').removeClass('no-scroll');
    showModal= false;
  });


  ////Mobile version menu/////

  var burger= $('#burger');
  burger.click(toggleMenu)

  function toggleMenu() {
    $('body').toggleClass('no-scroll');
    $('.menu-overlayer').toggleClass('open');
  }

  $(window).resize(function() {
    if($(window).width() > 680){
      $('body').removeClass('no-scroll')
      $('.menu-overlayer').removeClass('open');
    }
  });

  $(window).click(function(e) {

    var target= $(e.target);

    if(target.parents().hasClass("menu-overlayer") || target.hasClass("menu-overlayer")){
      toggleMenu();
    }

    if(e.target == modal[0]) {
      modal.removeClass('show-modal');

    }
  })

  ////Fill modal/////

  function fillModal(e){
    var originalModalInfo= e.target.parentNode.parentNode.parentNode;
    var modalInfo= $(originalModalInfo).clone();
    $(".modal-content").empty();
    $(".modal-content").append(modalInfo);
  }

  ////Smooth scroll to internal links/////

  $('a[href^="#"]').on('click', function(event) {
  var target = $(this.getAttribute('href'));

  if(target.length) {
    event.preventDefault();

    $('body, html').stop().animate({
      scrollTop: target[0].offsetTop
    }, 900);
  }
});

  ////Chart////
  var ctxA = document.getElementById("augusto-chart");

  var data = {
    labels: ["JS/ES6", "CSS3", "HTML5", "UX","UI", "REDUX", "REACT"],
    datasets: [
      {
        backgroundColor: 'rgba(254, 230, 76, 0.7)',
        borderColor:'rgba(254, 230, 76, 1)',
        borderWidth: 1,
        lineTension:.1,
        pointBackgroundColor: 'white',
        pointBorderWidth:1,
        pointHoverBorderWidth:1,
        data: [8.5, 9.5, 9.5, 8, 9.5, 5, 7.5]
      }
    ]
  };

  var options = {
    legend: {display: false},
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 10,
        stepSize: 2
      },
      pointLabels: {
        fontSize: 12,
        fontFamily:'Rubik',
        fontStyle : '300',
        fontColor: 'rgba(0,0,0,.7)'
      }
    }
  }

  var chartAugusto = new Chart(ctxA, {
    type: 'radar',
    data: data,
    options: options
  });

  // development owl carousel
  var owlDevelopment = $("#owl-development");
  owlDevelopment.owlCarousel({
    items:2,
    loop:true,
    dots:false,
    autoWidth:true,
    center:true,
    responsive:{
      600:{
        items:2
      }
    }
  });

  //arrows controls
  owlDevelopment.owlCarousel();
  $('.right-arrow-development').click(function() {
    owlDevelopment.trigger('next.owl.carousel');
  });
  $('.left-arrow-development').click(function() {
    owlDevelopment.trigger('prev.owl.carousel', [300]);
  });

  // design owl carousel
  var owlDesign = $("#owl-design");
  owlDesign.owlCarousel({
    items:2,
    loop:true,
    dots:false,
    autoWidth:true,
    center:true,
    responsive:{
      600:{
        items:2
      }
    }
  });

  //arrows controls
  owlDesign.owlCarousel();
  $('.right-arrow-design').click(function() {
    owlDesign.trigger('next.owl.carousel');
  });
  $('.left-arrow-design').click(function() {
    owlDesign.trigger('prev.owl.carousel', [300]);
  });

  //scroll reveal
  window.sr = ScrollReveal({
    mobile: true,
    reset: false,
    distance: '50px',
    duration: 800,
    easing: 'ease-out',
    scale: 1
  });
  //callbacks
  sr.reveal('.subtitle',{duration: 500, origin:'top'});
  sr.reveal('.title',{delay: 500});
  sr.reveal('.splash-page-footer',{origin:'right',reset: true});
  sr.reveal('.development-section',{distance: '100px'});
  sr.reveal('.design-section',{distance: '100px'});
  sr.reveal('#augusto-chart');
  sr.reveal('.experience-section-footer',{distance: '50px',origin:'right',reset: true});
});
