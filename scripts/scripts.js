$(document).ready(function() {

  setInterval(hideLoader, 200);

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

    if(target.parents().hasClass("menu-item") || target.hasClass("menu-overlayer")){
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
        label: "SKILLZ",
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
          position: "bottom"
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

  // cds owl carousel
  var owl = $("#owl-development");
  owl.owlCarousel({
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
  //owl carousel gets linked to the arrows
  owl.owlCarousel();
  // Go to the next item
  $('.right-arrow').click(function() {
    owl.trigger('next.owl.carousel');
  });
  // Go to the previous item
  $('.left-arrow').click(function() {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    owl.trigger('prev.owl.carousel', [300]);
  });

});
