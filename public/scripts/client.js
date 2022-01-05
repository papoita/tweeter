 const escape = require("./helpers.js");

$(document).ready(function () {
  $(".error").hide();


	const renderTweets = function (tweets) {
		$("#tweets-container").empty();
		for (const tweet of tweets) {
			const $renderTweet = createTweetElement(tweet);
			$("#tweets-container").prepend($renderTweet);
		}
	};

	const createTweetElement = function (tweet) {
		const { content, user, created_at } = tweet;
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
					${timeago.format(created_at)}
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

	/**
	 * Feedbacks:
	 * 1. please watch indentation.
	 * 2. it's okay to not have in one line for readability.
	 * 3. use variables for readability.
	 */
  const errorDisplay = function (errorText){
		const error = $(".error");

		error.slideDown("slow").text(errorText);

		setTimeout(()=>{
			error.hide(300);
		}, 3000);
	};

	/**
	 * Feedback
	 * 1. remove unnecessary return.
	 * 2. breakdown to separate if statements for readability.
	 */
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
		$.post("/tweets/", $tweet, (err, data) => {
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