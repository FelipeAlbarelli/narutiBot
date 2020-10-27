require('dotenv').config()
const http = require('http');
const Twitter = require('twitter');
const configSch = require('./schedule');
const functions = require('./functions');

const app = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

configSch(app);

app.stream('statuses/filter', {track: 'Naruti,naruti,Marucho,marucho,Niraji,niraji,Miruchi,Miruchi,naruji,Naruji,Maruchi,maruchi,naruchi,Naruchi'},  function(stream) {
    stream.on('data', function(tweet) {
        console.log(`${tweet.text}, por ${tweet.user.screen_name}, capdato na stream`)
        if (functions.isSocrates(tweet.user.screen_name)) {
            functions.reply(tweet, "O que foi Sócrates?", app);
        } else {
            let i = Math.random() * 3
            if (i <= 1) {
              functions.reply(tweet, "Cada coisa né?", app);
            } else if ( i> 1 && i<=2 ) {
              functions.reply(tweet, "Que coisa, hein.", app);
            } else {
              functions.reply(tweet , "Se você diz, né?", app)
            }
        }
    });
    stream.on('error', function(error) {
      console.log(error);
    });
  });

http.createServer(function (req, res) {
  console.log('pong');
  res.write("I'm alive");
  res.end();
}).listen(8080);