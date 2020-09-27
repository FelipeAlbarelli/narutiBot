require('dotenv').config()
const Twitter = require('twitter');
const express = require('express')
const configSch = require('./schedule');
const functions = require('./functions');

const app = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

configSch(app);

app.stream('statuses/filter', {track: 'Naruti'},  function(stream) {
    stream.on('data', function(tweet) {
        console.log(`${tweet.text}, por ${tweet.user.screen_name}, capdato na stream`)
        if (functions.isSocrates(tweet.user.screen_name)) {
            functions.reply(tweet, "O que foi Sócrates?", app);
        } else {
            functions.reply(tweet, "Cada coisa né?", app);
        }
    });
    stream.on('error', function(error) {
      console.log(error);
    });
  });

const app2 = express()
const port = process.env.PORT || 3000;

app2.get('/', (req, res) => {
  res.send('Hello World!')
})

app2.listen(port, () => {
  console.log(`Example app listening at port:${port}`)
})