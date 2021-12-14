$(document).ready(function() {
  console.log("test works");
function logKey(e) {
      console.log(` ${e.code}`);
    };
const textarea = document.querySelector("#tweet-text");
   textarea.addEventListener('keydown', logKey);
});
