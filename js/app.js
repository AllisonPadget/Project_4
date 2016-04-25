/************* SEARCH **************/
// var x = document.getElementByID('search');












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
  var captionText = $(this).children('img').attr('caption');
  $caption.text(captionText);
  
});


//click to hide
$overlay.click(function(){
  $overlay.hide();
});










