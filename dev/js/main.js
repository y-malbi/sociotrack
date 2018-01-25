$(window).scroll(function(){
  var dist = $('.profile img').offset().top;
  if ($(window).scrollTop() >= dist){
    $('header').css('background', 'rgba(28,175,94, 0.2)');
    $('form').css('background', 'transparent');
    $('header input').css('color', '#fff');
  }else{
    $('header').css('background', 'rgba(255, 255, 255, 0.1)');
    $('form').css('background', '#fff');
    $('header input').css('color', '#1CAF5E');
  }
});

$('.search').click(function( event ) {
  event.preventDefault();
});

// Aside menu
$('.menu-item').click(function(){
  var title_id = $(this).attr('data-target');
  $('.menu-item').removeClass('active-tab');
  $(this).addClass('active-tab');
  $('.tab-content').removeClass('active');
  $('#'+ title_id).addClass('active');
});

//Modal window
$('.show-modal').click(function(){
  $('body').append('<div class="modal-bg"></div>');
  $('#modal-window').addClass('active');
});
$('.close-btn').click(function(){
  $('.modal-bg').remove();
  $('#modal-window').removeClass('active');
});

//  ISOTOPE + MASONRY
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  percentPosition: true,
  masonry: {
    columnWidth: '.grid-item-size',
    gutter: 50,
    horizontalOrder: true
  }
});
// filter items on button click
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});
$('.button').click(function(){
  var title_btn = $(this).attr('data-filter');
  $('button').removeClass('is-checked');
  $(this).addClass('is-checked');
});
