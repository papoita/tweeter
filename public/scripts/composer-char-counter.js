$(document).ready(function() {
  $("#new-tweet-input").on('input', function() {
    const charLength = $(this).val().length;
    const maxLength = 140;
    const count = maxLength - charLength;
    const counter = $(this).siblings("output");
    counter.text(count);

    if (count < 0) {
     counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
  });
});