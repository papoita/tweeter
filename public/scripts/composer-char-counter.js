$(document).ready(function() {

  $("#tweet-text").on('input', function(){
//console.log(this);
const $charLength = $(this).val().length;
const $charLeft = 140 - $charLength;
console.log($charLength);
//$("#counter")

//TODO fix once reach limit fo negtive numbers it all turns red
//take css to css place///how to do that add html new class ?
//make sure siblings is the right way to go.. also input vs keydown
//console.log(count);
if ($charLeft > 0){
let count = $(this).siblings("output").css( "color", "black" );
count.text($charLeft);
} else {
  let count = $(this).siblings("output").css( "color", "red" );
count.text($charLeft);
}

  });
// function logKey(e) {
//       console.log(` ${e.code}`);
//     };
// const textarea = document.querySelector("#tweet-text");
//    textarea.addEventListener('keydown', logKey);
});
