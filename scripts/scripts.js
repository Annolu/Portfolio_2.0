$(document).ready(function() {

  setInterval(hideLoader, 2000);

  function hideLoader(){
    var loader= $('.loader-overlayer');
    loader.addClass('hide-loader');
  }

  ////Modal/////

  var modal = $('#myModal');
  var modalButton = $(".modalButton");
  var span = $(".close");

  modalButton.click(function(e) {
    modal.addClass('show-modal');
    fillModal(e);
  });

  span.click(function() {
    modal.removeClass('show-modal');
  });

  ////Mobile version menu/////

  var burger= $('#burger');
  burger.click(toggleMenu)

  function toggleMenu() {
    $('body').toggleClass('no-scroll')
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
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        backgroundColor: [
          'rgba(254, 230, 76, 0.8)'
        ],
        borderColor: [
          'rgba(254, 230, 76, 1)'
        ],
        borderWidth: 1,
        data: [6, 9, 7, 8, 7, 6, 7],
      }
    ]
  };

  var chartAugusto = new Chart(ctxA, {
    type: 'radar',
    data: data,
    options: {
      legend: {
        display: false
      },
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 10,
          stepSize: 2
        },
        pointLabels: {
          fontSize: 14,
          fontColor: '797878'
        }
      }
    }
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
  owlDevelopment.owlCarousel();
  $('.right-arrow-development').click(function() {
    console.log('mierda')
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
  owlDesign.owlCarousel();
  $('.right-arrow-design').click(function() {
    owlDesign.trigger('next.owl.carousel');
  });
  $('.left-arrow-design').click(function() {
    owlDesign.trigger('prev.owl.carousel', [300]);
  });

  //scroll reveal
  window.sr = ScrollReveal();
  sr.reveal('.awards-wrapper', { origin: 'right', duration: 1000, distance: '60px' });
});
