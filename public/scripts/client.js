/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function(){

const tweetData = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }
]
const renderTweets = function(tweets){
  for (let tweet of tweets){
    let $renderTweet = createTweetElement(tweet);
    $(".tweet-container").append($renderTweet);
  }
}

const createTweetElement = function(tweet){
  const $tweet = $(`
    	<article class="tweet">
				<header class="user">
<div class="user-picture-name">
					<i class="far fa-user col-1"></i>
					<p class="username">
						Rhoda JAcobs
					</p>
</div>
<div>
					<h3 class="user-handle">
						@MrsJAcobs
						</h2>
</div>
				</header>
				<p class="tweets-posted">
					HEllo World!
				</p>
				<hr>
				<footer>
					<span class="time-passed">
						10 days ago
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

renderTweets(tweetData);

});