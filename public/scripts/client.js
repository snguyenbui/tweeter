/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = (tweetData) => {
  for (let tweet of tweetData) {
    let $tweet = createTweetElement(tweet);
    $("#timeline").prepend($tweet);
    $("p").first().text(tweet.content.text);
  }
};

const loadTweets = () => {
  $("#timeline").empty();
  $.get("/tweets", (data) => {
    renderTweets(data);
  })
};

const createTweetElement = (tweet) => {
  const newTweet = $(
    `<article class="tweet">
    <header>
      <a><img src="${tweet.user.avatars}"></a><span>${tweet.user.name}</span><em>${tweet.user.handle}</em>
    </header>
    <p></p>
    <footer>
      <span>${Math.round((Date.now() - tweet.created_at) / 60000)} minutes ago</span><em>🔁</em><em>❤</em><em>⚑</em>
    </footer>
    </article>`
  );

  return newTweet;
};

const checkTweet = (text) => {
  if (text === "") {
    $("#long").css("display", "none");
    $("#empty").css("display", "unset");
    $(".error").slideDown(500);
    return false;
  }

  if (text.length > 140) {
    $("#empty").css("display", "none");
    $("#long").css("display", "unset");
    $(".error").slideDown(500);
    return false;
  }

  return true;
};

$(document).ready(() => {
  loadTweets();
  $("form").submit((event) => {
    $(".error").slideUp(500);
    if (checkTweet($("form")[0][0].value)) {
      let data = $("form").serialize();
      $.post("/tweets", data)
        .then($("#tweet-text").val(""))
        .then(updateCounter())
        .then(loadTweets());
    }
    loadTweets()
    event.preventDefault();
  });
});