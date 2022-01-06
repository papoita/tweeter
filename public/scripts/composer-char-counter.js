$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    const charLength = $(this).val().length;
    const maxLength = 140;
    const counter = maxLength - charLength;

    let count = 0;
    if (counter >= 0) {
      count = $(this).siblings("output").css("color", "black");
      count.text(counter);
    } else {
      count = $(this).siblings("output").css("color", "red");
      count.text(counter);
    }
  });
});