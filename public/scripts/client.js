/**
 * /*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 *
 * @format
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function () {
	//avoid XSS attacks on string literals
	const escape = function (str) {
		let div = document.createElement("div");
		div.appendChild(document.createTextNode(str));
		return div.innerHTML;
	};

	//create new DOM element and appends it
	const renderTweets = function (tweets) {
		//(doesn't reload all tweets
		$("#tweet-container").empty();
		for (const tweet of tweets) {
			let $renderTweet = createTweetElement(tweet);
			$("#tweet-container").prepend($renderTweet);
		}
	};

	const createTweetElement = function (tweet) {
		const $tweet = $(`
    	<article class="tweet">
				<header class="user">
<div class="user-picture-name">
					<img class="user-icon" src="${tweet.user.avatars}"></img>
					<p class="username">
						${tweet.user.name}
					</p>
</div>
<div>
					<h2 class="user-handle">
						${tweet.user.handle}
						</h2>
</div>
				</header>
				<p class="tweets-posted">
					${escape(tweet.content.text)}
				</p>
				<hr>
				<footer>
					<span class="time-passed">
					${timeago.format(tweet.created_at)}
					</span>
					<span class="tweet-icons">
						<i class="far fa-flag"></i>
						<i class="fas fa-retweet"></i>
						<i class="far fa-heart"></i>

					</span>
				</footer>
			</article>`);
		return $tweet;
	};

	$("#tweet-form").on("submit", (event) => {
		event.preventDefault();
		//validate length of tweet and alert error
		let lengthTweet = $("#tweet-text").val().length;
		if (lengthTweet > 140) {
			alert("Only 140 characters allowed");
			return;
		} else if (!lengthTweet) {
			alert("write a tweet");
		}

		//serialize and post tweet
		let $tweet = $("#tweet-form").serialize();
		$.post("/tweets/", $tweet, (err, data) => {
			loadTweets();

			//clears text box after post
			const $input = $("#tweet-text");
			$input.val(" ").focus();
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
