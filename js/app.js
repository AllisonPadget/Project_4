/************* REAL TIME SEARCH **************/

var $search = $('input');

$search.keyup(function(){
  var userInput = $(this).val().toLowerCase();
  $('#gallery img').each(function(){
    var alt = $(this).attr('alt').toLowerCase();
    if(alt.search(userInput) > -1){
      $(this).parent().fadeIn();
    } else {
      $(this).parent().fadeOut();
    }
  });
});
  

/************* OVERLAY **************/


var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');
var $caption = $('<p></p>');

//add an image to overlay
$overlay.append($image);

//add caption to overlay
$overlay.append($caption);

// add overlay
$('body').append($overlay);

//click on thumbnail
$('#gallery a').click(function( event ){
  event.preventDefault();
  var imageLocation = $(this).attr('href');
  //update overlay with image linked in the clicked
  $image.attr('src', imageLocation);
  
  //show overlay
  $overlay.show();
  
  //get child's alt attribute and set caption
  var captionText = $(this).children('img').attr('title');
  $caption.text(captionText);
  
});


/************** YouTube VIDEO **************/

// var $video = $('<iframe frameborder="0" allowfullscreen> </iframe>');
// $overlay.append($video);



/***  https://youtu.be/_zR6ROjoOX0 ***/





/************* ARROW PHOTO NAV **************/

var $leftArrow = $('<button id="leftArrow"> &#x276E; </button>');
var $rightArrow = $('<button id="rightArrow"> &#x276F; </button>');
var $exit = $('<button id="exit"> &#x2715; </button>');

$overlay.append($exit);
$overlay.append($leftArrow);
$overlay.append($rightArrow);


var $index = 0;


$leftArrow.on('click', function(event){
  prevImage();
});

$rightArrow.on('click', function(event){
  nextImage();
});

function nextImage() {
  $index++;
  /* loop up to first image in gallery */
  if ($index >= $('#gallery li').length) {
      $index = 0;
    }
    /* use index to get next image */
    var nextImage = $('#gallery li').get($index).getElementsByTagName('a');
    /* get new image location and caption */
    var imageLocation = $(nextImage).attr('href');
    var imageCaption =  $(nextImage).children('img').attr('title');
    /* update overlay image */
    updateImage(imageLocation, imageCaption);
}

function updateImage(imageLocation, imageCaption) {
    /* update image source */
    $image.attr("src", imageLocation);
    /* set caption text */
    $caption.text(imageCaption);
}

function prevImage() {
    /* update the index */
    $index--;
    /* loop back to last image in gallery */
    if ($index < 0) {
        $index = $('#gallery li').length - 1;
    }
    /* get the previous image by index */
    var prevImage = $('#gallery li').get($index).getElementsByTagName('a');
    /* update the image location and caption */
    var imageLocation = $(prevImage).attr('href');
    var imageCaption =  $(prevImage).children('img').attr('title');
    /* update overlay */
    updateImage(imageLocation, imageCaption);
}




/*** click EXIT to hide ***/
$exit.click(function(){
  $overlay.fadeOut(1000);
});



/************** KEYBOARD NAVIGATION **************/

$('body').keyup( function(e){
  if(e.which == 37){
    prevImage();
  } else if (e.which == 39){
    nextImage();
  } else if (e.which == 32 || e.which == 27){
    $('#overlay').fadeOut(1000);
  }
});







