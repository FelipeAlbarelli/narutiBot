const Twitter = require('twitter');
const env = require('./env');

const app = new Twitter({
    consumer_key: env.apiKey,
    consumer_secret: env.apiSecreteKey,
    access_token_key: env.accessToken,
    access_token_secret: env.accessTokenSecret
    // bearer_token: env.bearerToken
})

// app.post('statuses/update', 
//     {
//         status: 'Dia.'
//     },
//     function(error, tweet, response) {
//     if(error) throw error;
//     console.log(tweet);  // Tweet body.
// });

const reply = function(tweet, text) {
    var res = {
      status: text + tweet.user.screen_name,
      in_reply_to_status_id: '' + tweet.id_str
    };
  
    twitter.post('statuses/update', res,
      function(err, data, response) {
        console.log(data);
      }
    );
}

app.stream('statuses/filter', {track: 'Naruti'},  function(stream) {
    stream.on('data', function(tweet) {
        reply(tweet, "Cada coisa né?");
    });
  
    stream.on('error', function(error) {
      console.log(error);
    });
  });