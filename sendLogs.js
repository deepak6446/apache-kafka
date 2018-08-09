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
let count = 0
// setInterval(()=>{
//     KafkaService.sendRecord(logs);
// }, 2000)

//update metadata when the producer is initialized bu calling refreshMetadata before sending first message
client.refreshMetadata([global.config.topic], (err) => {
    if (err) {
        console.log('Error refreshing kafka metadata', err);
    } else {
        console.log('metadata found')
        // setTimeout(() => {
            global.startTime = Date.now();
            let s = setInterval(() => {
                for (let index = 0; index < 1; index++) {
                    logs.startTime = Date.now();
                    logs.count = count++    
                    KafkaService.sendRecord(logs);
                }
                global.stopTime = Date.now();
            }, 1);
            //15 millisecond
            setTimeout(() => {
                clearInterval(s);
                // process.exit(0);
            }, 100);
        // }, 500);
    }    
});



