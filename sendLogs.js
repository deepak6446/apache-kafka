const events_1 = require("events");
try {
    process.setMaxListeners(0);
    events_1.EventEmitter.defaultMaxListeners = Infinity;
}
catch (e) {
}

let KafkaService = require('./producer').KafkaService

let logs = {
        "uid" : "logbcc097242b6b0557e091cda822533b0c6873",
        "message" : "action started",
        "activity_name" : "devtools-accountstore",
        "activity_id" : "a6",
        "version" : "v1",
        "activity_label" : "Account Store",
        "type" : "system",
        "debugger" : "false",
        "flow_uid" : "fl2caaecfc765bab7cad2c21",
        "bill_uid" : "vbidb72392e5d8b28b56e8fd2daa45c30d50deaa66e32549",
        "user_uid" : "fla692a1784c64fe368fff33",
        "time_stamp" : 1524041841233,
        "project_uid" : "fl787e5c1613a4777b7f0d1e",
        "env_uid" : "fl322785623ef9100c2fb081",
        "org_uid" : null
    }

// setInterval(()=>{
//     KafkaService.sendRecord(logs);
// }, 2000)
setTimeout(() => {
    console.log('send data startTime: ', Date.now())
    for (let index = 0; index < 10000; index++) {
        KafkaService.sendRecord(logs);
    }
    console.log('send data stopTime: ', Date.now())    
}, 2000);



