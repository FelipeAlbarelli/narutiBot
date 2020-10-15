const schedule = require('node-schedule');

const _config = (params = [{hour: 1 , min: 1, msg: 'hummmm'}], app) => {
    params.forEach( p => {
        schedule.scheduleJob({
            hour: p.hour, 
            minute: p.min 
            // dayOfWeek: 0
        }, function(){
            app.post('statuses/update' , {status: p.msg} , (err , data , res) => {
                console.log('Mensagem' , p.msg)
            })
        });
    })
}

const config = (app) => {
    _config([
        {
            hour: 11,
            min: 0,
            msg: 'Dia'
        },
        {
            hour: 16,
            min: 0,
            msg: 'Buxin cheio :P'
        },
        {
            hour: 23,
            min: 30,
            msg: 'Bom, papo ta bom...'
        }
    ], app)
}

module.exports = config