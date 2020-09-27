const Twitter = require('twitter');
const env = require('./env');

const app = new Twitter({
    consumer_key: env.apiKey,
    consumer_secret: env.apiSecreteKey,
    access_token_key: env.accessToken,
    access_token_secret: env.accessTokenSecret
})

const reply = (tweet, text) => {
    const nameID = tweet.id_str;
    const name = `@${tweet.user.screen_name}`
    var res = {
        status:  name + text,
        in_reply_to_status_id: nameID
    };
    console.log(tweet);
    app.post('statuses/update', res,
      function(err, data, response) {
            console.log('data:', "*".repeat(20));
            console.log(data)
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