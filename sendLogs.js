const events_1 = require("events");
try {
    process.setMaxListeners(0);
    events_1.EventEmitter.defaultMaxListeners = Infinity;
}
catch (e) {
}

let KafkaService = require('./producer').KafkaService
let client = require('./producer').client

let logs = {
        message: "kafa is amazing"
    }

// setInterval(()=>{
//     KafkaService.sendRecord(logs);
// }, 2000)

client.refreshMetadata([global.config.topic], (err) => {
    if (err) {
        console.log('Error refreshing kafka metadata', err);
    } else {
        console.log('metadata found')
        setTimeout(() => {
            global.startTime = Date.now();
            let s = setInterval(() => {
                for (let index = 0; index < 2400; index++) {
                    KafkaService.sendRecord(logs);
                }
                global.stopTime = Date.now();
            }, 2)
            //15 millisecond
            setTimeout(() => {
                clearInterval(s);
                // setTimeout(() => { process.exit(0) }, 6*1000);
            }, 15 * 1000);
        }, 500);
    }    
});



