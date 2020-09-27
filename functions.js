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

module.exports = {
    isSocrates,
    reply
}