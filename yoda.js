var Twit = require("twit");
var twillioKeys = require("configTwillio.js");
var twitterKeys = require("configTwitter.js");
var accountSid = twillioKeys.accountSid; 
var authToken = twillioKeys.authToken; 
var client = require('twilio')(accountSid, authToken); 
var twit = new Twit({
  "consumer_secret": twitterKeys.consumer_secret,
  "consumer_key": twitterKeys.consumer_key,
  "access_token": twitterKeys.access_token,
  "access_token_secret": twitterKeys.access_token_secret
});

var stream = twit.stream("user", { screen_name: twitterKeys.toFollow });

stream.on("tweet", function (tweet) {
	var tweetCased = tweet.text.toLowerCase();

	if(tweetCased.indexOf("starwars") !== -1 || 
		tweetCased.indexOf("star wars") !== -1 ||
		tweetCased.indexOf("sw") !== -1 ||
		tweetCased.indexOf("the force awakens") !== -1 ||
		tweetCased.indexOf("theforceawakens") !== -1 ||
		tweetCased.indexOf("tickets") !== -1 ||
		tweetCased.indexOf("imax") !== -1 ||
		tweetCased.indexOf("midnight") !== -1 ||
		tweetCased.indexOf("12") !== -1 ||
		tweetCased.indexOf("purchase") !== -1){

		client.messages.create({
			to: twillioKeys.myNum,  
			from: twillioKeys.myTwillioNum,
			body: tweetCased   
		},
		function(err, message) { 
			  console.log(err); 
		});

	} else {
		console.log("tweet did not match criteria");
	}
});
