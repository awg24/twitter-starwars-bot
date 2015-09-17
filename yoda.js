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
	var tweet = tweet.text.toLowerCase();
	
	if(tweet.indexOf("starwars") !== -1 || 
		tweet.indexOf("star wars") !== -1 ||
		tweet.indexOf("sw") !== -1 ||
		tweet.indexOf("the force awakens") !== -1 ||
		tweet.indexOf("theforceawakens") !== -1 ||
		tweet.indexOf("tickets") !== -1 ||
		tweet.indexOf("imax") !== -1 ||
		tweet.indexOf("midnight") !== -1 ||
		tweet.indexOf("12") !== -1 ||
		tweet.indexOf("purchase") !== -1){

		client.messages.create({
			to: twillioKeys.myNum,  
			from: twillioKeys.myTwillioNum,
			body: tweet   
		},
		function(err, message) { 
			  console.log(err); 
		});

	} else {
		console.log("tweet did not match criteria");
	}
});
