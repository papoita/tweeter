$(document).ready(function() {
  $("#new-tweet-error").hide();

	$("#write-new-tweet, #btn-top-page").click(function(event){
		event.preventDefault();
		$("html, body").animate({ scrollTop: "0" })
		$("#new-tweet-input").focus();
	});

  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const renderedTweet = createTweetElement(tweet);
      $("#tweets-container").prepend(renderedTweet);
    }
  };

  const createTweetElement = function(tweet) {
    const { content, user, created_at } = tweet;
    const { avatars, handle, name } = user;

    const escape = function (str) {
      const div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
	  };

    return `
    	<article class="tweet">
				<header class="tweet-header">
					<div class="tweet-header-user">
						<img src="${avatars}" alt="tweet user avatar"></img>
						<p>${name}</p>
					</div>
					<h2 class="tweet-header-handle">${handle}</h2>
				</header>
				<p class="tweet-content">
					${escape(content.text)}
				</p>
				<hr>
				<footer class="tweet-footer">
					<p class="tweet-footer-timestamp">
					${timeago.format(created_at)}
					</p>
					<div class="tweet-footer-icons">
						<i class="far fa-flag"></i>
						<i class="fas fa-retweet"></i>
						<i class="far fa-heart"></i>
					</div>
				</footer>
			</article>
		`;
  };

  const errorDisplay = function(errorText) {
    const error = $("#new-tweet-error");

    error.slideDown("slow").text(errorText);

    setTimeout(()=>{
      error.hide(300);
    }, 3000);
  };

  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault();

    const lengthTweet = $("#new-tweet-input").val().length;

    if (!lengthTweet) {
      return errorDisplay("🛑 TOO SHORT! What are you really thinking? 🛑 ");
    }

    if (lengthTweet > 140) {
      return errorDisplay("🛑 TOO LONG! Only 140 characters allowed 🛑");
    }

    let tweet = $(this).serialize();
    $.post("/tweets/", tweet, (err, data) => {
      loadTweets();

      const input = $("#new-tweet-input");
      input.val("").focus();
      $("#new-tweet-counter").html("140");
    });
  });

  //loads tweets
  const loadTweets = () => {
    $.get("/tweets", (tweet) => {
      renderTweets(tweet);
    });
  };
  
  loadTweets();
});