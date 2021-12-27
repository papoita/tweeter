/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function(){


const renderTweets = function(tweets){
   $(".tweet-container").empty();
  for (const tweet of tweets){
    let $renderTweet = createTweetElement(tweet);
   $(".tweet-container").append($renderTweet);
  }
};

const createTweetElement = function(tweet){
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
					${tweet.content.text}
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
			</article>`
  );
  return $tweet;
}
//add Event listner and prevent default behavior
// .serialize() function turns a set of form data into a query string. This serialized data should be sent to the server in the data field of the AJAX POST request.
$("tweet-form").on("submit", event =>{
  //event.preventDefault();
  let $tweet = $("tweet-form").serialize();
  $.post("/tweets/", $tweet, (err, data) => {
    loadTweets();
    const $input = $("#tweet-text");
    $input.val(" ").focus();
  })
})

const loadTweets = () => {
  $.get("/tweets", (tweet) => {
    renderTweets(tweet);
  })
}
loadTweets();
});