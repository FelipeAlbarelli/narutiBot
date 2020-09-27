require('dotenv').config()
const Twitter = require('twitter');
const express = require('express')


const app = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const isSocrates = (text = '') => {
    return [
        'socrates', 
        'Socrates', 
        "Sócrates" , 
        'sócrates', 
        'socrates'.toLocaleUpperCase(), 
        'Socrates'.toLocaleUpperCase(), 
        "Sócrates".toLocaleUpperCase(), 
        'sócrates'.toLocaleUpperCase()
    ].some( i => text.includes(i) )
}

const reply = (tweet, text) => {
    const nameID = tweet.id_str;
    const name = `@${tweet.user.screen_name} `
    var res = {
        status:  name + text,
        in_reply_to_status_id: nameID
    }
    app.post('statuses/update', res,
      function(err, data, response) {
            console.log(`Respondendo ${data.in_reply_to_screen_name}`)
      }
    );
}

app.stream('statuses/filter', {track: 'Naruti'},  function(stream) {
    stream.on('data', function(tweet) {
        console.log(`${tweet.text}, por ${tweet.user.screen_name}, capdato na stream`)
        // if (isSocrates(tweet.user.screen_name)){
        //     reply(tweet, "O que foi Sócrates?");
        // }
        reply(tweet, "Cada coisa né?");
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
  console.log(`Example app listening at http://localhost:${port}`)
})