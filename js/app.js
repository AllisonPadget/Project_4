/************* REAL TIME SEARCH **************/

var $search = $('input');

$search.keyup(function(){
  var userInput = $(this).val().toLowerCase();

  $('#gallery img').each(function(){
    var altText = $(this).attr('title').toLowerCase();

    if(altText.search(userInput) > -1){
      $(this).parent().parent().fadeIn();
    } else {
      $(this).parent().parent().fadeOut();
    }
  });
});
  

/************* OVERLAY **************/

var $index = 0;
var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');
var $caption = $('<p></p>');

//add an image to overlay
$overlay.append($image);

var $video = $('<iframe id="player" type="text/html" src="" frameborder="0"></iframe>');
$video.hide();
$overlay.append($video);

//add caption to overlay
$overlay.append($caption);

// add overlay
$('body').append($overlay);

function displayItem(anchor) {
  var href = $(anchor).attr('href');

  if ($(anchor).hasClass('photo')) {
    displayPhoto(href);
  }

  if ($(anchor).hasClass('video')) {
    displayVideo(href);
  }
  
  //show overlay
  $overlay.show();
  
  //get child's alt attribute and set caption
  var captionText = $(anchor).children('img').attr('title');
  $caption.text(captionText);
}

function displayPhoto(href) {
  $video.hide();
  $image.show();
  $image.attr('src', href);
}

function displayVideo(href) {
  $image.hide();
  $video.show();
  $video.attr('src', href.replace('https://youtu.be', 'http://www.youtube.com/embed'));
}

function nextItem() {
  $index++;
  /* loop up to first image in gallery */
  if ($index >= $('#gallery li').length) {
    $index = 0;
  }
  /* use index to get next image */
  var nextImage = $('#gallery li').get($index).getElementsByTagName('a');
  displayItem(nextImage);
}

function prevItem() {
  /* update the index */
  $index--;
  /* loop back to last image in gallery */
  if ($index < 0) {
    $index = $('#gallery li').length - 1;
  }
  /* get the previous image by index */
  var prevImage = $('#gallery li').get($index).getElementsByTagName('a');
  displayItem(prevImage);
}

//click on thumbnail
$('#gallery a').click(function (event) {
  event.preventDefault();
  $index = $(this).parent().index();
  displayItem(this);
});





/************* ARROW PHOTO NAV **************/

var $leftArrow = $('<button id="leftArrow"> &#x276E; </button>');
var $rightArrow = $('<button id="rightArrow"> &#x276F; </button>');
var $exit = $('<button id="exit"> &#x2715; </button>');

$overlay.append($exit);
$overlay.append($leftArrow);
$overlay.append($rightArrow);


$leftArrow.on('click', function(event){
  prevItem();
});

$rightArrow.on('click', function(event){
  nextItem();
});


/*** click EXIT to hide ***/
$exit.click(function(){
  $overlay.fadeOut(1000);
});



/************** KEYBOARD NAVIGATION **************/

var LEFT = 37;
var RIGHT = 39;
var ESC = 27;

$('body').keyup(function (e) {
  if(e.which == LEFT){
    prevItem();
  } else if (e.which == RIGHT){
    nextItem();
  } else if (e.which == ESC){
    $('#overlay').fadeOut(1000);
  }
});







