const escape = require("./helpers.js");

$(document).ready(function() {
  $(".error").hide();


  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $renderTweet = createTweetElement(tweet);
      $("#tweets-container").prepend($renderTweet);
    }
  };

  const createTweetElement = function(tweet) {
    const { content, user, createdAt } = tweet;
    const { avatars, handle, name } = user;

    return `
    	<article class="tweet">
				<header class="user">
					<div class="user-picture-name">
						<img class="user-icon" src="${avatars}"></img>
						<p class="username">
							${name}
						</p>
					</div>
					<div>
						<h2 class="user-handle">
							${handle}
							</h2>
					</div>
				</header>
				<span class="tweets-posted">
					${escape(content.text)}
				</span>
				<hr>
				<footer>
					<span class="time-passed">
					${timeago.format(createdAt)}
					</span>
					<span class="tweet-icons">
						<i class="far fa-flag"></i>
						<i class="fas fa-retweet"></i>
						<i class="far fa-heart"></i>
					</span>
				</footer>
			</article>
		`;
  };

  const errorDisplay = function(errorText) {
    const error = $(".error");

    error.slideDown("slow").text(errorText);

    setTimeout(()=>{
      error.hide(300);
    }, 3000);
  };

  $("#tweet-form").on("submit", (event) => {
    event.preventDefault();

    const lengthTweet = $("#tweet-text").val().length;

    if (lengthTweet > 140) {
      errorDisplay("🛑 TOO LONG! Only 140 characters allowed 🛑");
    }

    if (!lengthTweet) {
      errorDisplay("🛑 TOO SHORT! What are you really thinking? 🛑 ");
    }

    let $tweet = $("#tweet-form").serialize();
    $.post("/tweets/", $tweet, () => {
      loadTweets();

      const $input = $("#tweet-text");
      $input.val(" ").focus();
      $(".counter").html("140");
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