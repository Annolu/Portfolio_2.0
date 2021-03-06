$(document).ready(function() {

  //// hide/show top-menu on scroll
  var prev = 0;
  var $window = $(window);
  var $nav = $('.top-menu');

  $window.on('scroll', function(){
    var scrollTop = $window.scrollTop();
    $nav.toggleClass('hidden', scrollTop < prev);
    if(scrollTop==0){
      $nav.removeClass('hidden');
    }
    prev = scrollTop;
  });

  function hideLoader(){
    var $loader= $('.loader-overlayer');
    $loader.addClass('hide-loader');
  }

  /// DEVELOPMENT LOOPS
  const owlOptions = {
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
  }

  const createDeveloperSection = (data) =>{
    let developments = data.developments.map((item) => {
      return ('<div class="project-item">' +
                '<div class="item-info">' +
                  '<h2>'+item.title+'</h2>' +
                  '<a class="modalButton" id="'+item.title+'">view more</a>' +
                  // '<a target="_blank" href="'+item.livelink+'">live</a>' +
                  '<h3>'+item.subtitle+'</h3></div>' +
                '<img src="'+item.imgthumb+'"></div>');
    });
    let $owlDevelopment = $("#owl-development");
    $owlDevelopment.append(developments);

    // development owl carousel
    $owlDevelopment.owlCarousel(owlOptions);

    //arrows controls
    $('.right-arrow-development').click(() => {
      $owlDevelopment.trigger('next.owl.carousel');
    });
    $('.left-arrow-development').click(() => {
      $owlDevelopment.trigger('prev.owl.carousel', [300]);
    });


    preloadImages(data.developments)
    setModal(data);
  }

  // Load the json file
  $.getJSON( './data.json', (data) => {
    createDeveloperSection(data);
    hideLoader();
    $('.body-wrapper').css('position', 'relative');
  });

  //Preload all top images for the modal
  const preloadImages = (data) => {
    data.forEach((item) => {
      $('<img />').attr('src',item.imgtop).appendTo('body').css('display','none');
      $('<img />').attr('src',item.imgbig).appendTo('body').css('display','none');
    });
  }

  ////Modal/////
  const setModal = (data) => {
    var $modal = $('#myModal');
    var $modalButton = $(".modalButton");
    var $closeModalButton = $(".close-modal");
    var showModal= false;

    //show modal

    $modalButton.click(function(e) {
      setTimeout(function(){$modal.addClass('show-modal')}, 200);
      $('.body-wrapper').addClass('scale-body-wrapper');
      $('body').addClass('no-scroll');
      showModal= true;
      $nav.removeClass('hidden');
      fillModal(e, data);
    });

    $closeModalButton.click(function() {
      closeModal();
    });

    function closeModal() {
      $modal.removeClass('show-modal');
      setTimeout(function(){$('.body-wrapper').removeClass('scale-body-wrapper')}, 0);
      $('body').removeClass('no-scroll');
      showModal= false;
      //modal scrolls back to top when closed
      setTimeout(function(){$('#myModal').stop().animate({'scrollTop': 1,}, 10);}, 300)
    }
  }

  ////Fill modal with data coming from the json file/////

  function fillModal(e, data){
    var modalData= data.developments.filter(function(item){
      if(e.target.id == item.title){
        return item;
      }
    })
    $('.work-title').html(modalData[0].title);
    $('.modal-img-wrapper').html("<img class='work-img' src="+ modalData[0].imgsmall +"></img>")
    $('.work-img').css('backgroundColor', modalData[0].themecolour);
    $('.modal-light-section').html("<img class='work-img2' src="+ modalData[0].imgbig +"></img>")
    $('.modal-light-section').css('backgroundColor', modalData[0].themecolour);
    $('.work-description').html(modalData[0].description);
    if(modalData[0].livelink){
      $('.live-button').css("display", "inline-block");
      $('.live-button').attr('href', modalData[0].livelink);
    }else{
      $('.live-button').css("display", "none");
    }
    if(modalData[0].gitlink){
      $('.github-button').css("display", "inline-block");
      $('.github-button').attr('href', modalData[0].gitlink);
    }else{
      $('.github-button').css("display", "none");
    }
  }

  ////Mobile version menu/////

  var $burger= $('#burger');
  $burger.click(toggleMenu);

  function toggleMenu() {
    $('body').toggleClass('no-scroll');
    $('.menu-overlayer').toggleClass('open');
  }

  ////Smooth scroll to internal links/////

  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));

    if(target.length) {
      event.preventDefault();
      $('body, html').stop().animate({
        scrollTop: target[0].offsetTop
      }, 900, function (){
        $nav.removeClass('hidden');
      });
    }
  });

  // Close modal if clicked on overlayer///
  $(window).click((e) => {
    let $target = $(e.target);
    if($target.parents().hasClass('menu-overlayer') || $target.hasClass('menu-overlayer')){
      toggleMenu();
    }
  });

  ////Chart////
  var ctxA = document.getElementById("chart");

  var data = {
    labels: ["JAVASCRIPT", "CSS3/SASS", "HTML5", "BOOTSTRAP", "WORDPRESS", "PHP", "GIT", "JQUERY"],
    datasets: [
      {
        backgroundColor: 'rgba(108, 219, 219, .7)',
        borderColor:'rgba(108, 219, 219, 1)',
        borderWidth: 2,
        lineTension:.1,
        pointBackgroundColor: 'white',
        pointBorderWidth:1,
        pointHoverBorderWidth:1,
        data: [7, 8.5, 8.5, 7, 7, 6, 6, 7]
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

  var chart = new Chart(ctxA, {
    type: 'radar',
    data: data,
    options: options
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

  //scroll reveal callbacks
  sr.reveal('.subtitle',{duration: 500, origin:'top'});
  sr.reveal('.splash-page .title',{delay: 500});
  sr.reveal('.splash-page-footer',{origin:'right',reset: true});
  sr.reveal('.development-section',{distance: '100px'});
  sr.reveal('#chart');
});
