console.log('the AQI bot is starting');

var Twit = require("twit");

var config = require("./config");

var T = new Twit(config);


// Boston Air Quality
var airQualityURL = "http://api.airvisual.com/v2/nearest_city?lat=42.3601&lon=-71.0589&key=RNjgJZaccexvPMKqc";

var request = require('request');


// Start once
tweeter();

// Once every N milliseconds
setInterval(tweeter, 60*60*1000);

// Here is the bot!
function tweeter() {

  request(airQualityURL, gotData);

  function gotData(error, response, body) {
    if (!error) {
      var data = JSON.parse(body);

      var pollution = data.data.current.pollution.aqius;
      console.log(pollution);

      if (pollution <= 50){
      	var tweet = 'The air quality index is ' + pollution + ", which is good.";

      }else if(pollution <= 100){
      	var tweet = 'The air quality index is ' + pollution + ", which is moderate.";

      }else if(pollution <= 150){
      	var tweet = 'The air quality index is ' + pollution + ", which is unhealthy for sensitive people.";

      }else if(pollution <= 200){
      	var tweet = 'The air quality index is ' + pollution + ", which is unhealthy.";
      	
      }else if(pollution <= 300){
      	var tweet = 'The air quality index is ' + pollution + ", which is very unhealthy.";
      	
      }else if(pollution <= 500){
      	var tweet = 'The air quality index is ' + pollution + ", which is hazardous.";
      	
      };

      // Post that tweet!
      T.post('statuses/update', { status: tweet }, tweeted);

      // Callback for when the tweet is sent
      function tweeted(err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log('Success: ' + data.text);
        }
      }
    }
  }

}