$(document).ready(function() {

  $("#tweet-text").on('input', function(){
const $charLength = $(this).val().length;
const $charLeft = 140 - $charLength;
console.log($charLength);

if ($charLeft > 0){
let count = $(this).siblings("output").css( "color", "black" );
count.text($charLeft);
} else {
  let count = $(this).siblings("output").css( "color", "red" );
count.text($charLeft);
}

  });

});
