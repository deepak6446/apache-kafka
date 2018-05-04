const events_1 = require("events");
try {
    process.setMaxListeners(0);
    events_1.EventEmitter.defaultMaxListeners = Infinity;
}
catch (e) {
    console.log('error:', e)
}

var kafka = require("kafka-node")
var uuid = require("uuid")
global.config = require('./env/local.json');

const client = new kafka.Client(global.config.zhookeeper, "my-client-id", {
    groupId: global.config.groupId,
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
});

const producer = new kafka.HighLevelProducer(client);

producer.on("ready", () => {
    console.log("Kafka Producer is connected and ready.");
});

producer.on("error", (error) => {
    console.error('error: ', error);
});
let i=0
const KafkaService = {
    sendRecord: (logs) => {
        if (!Object.keys(logs).length) {
            console.log('log must not be empty.');
        }

        const buffer = new Buffer.from(JSON.stringify(logs));

        // Create a new payload
        const record = [
            {
                topic: global.config.topic,
                messages: buffer,
                attributes: 1 /* Use GZip compression for the payload */
            }
        ];

        //Send record to Kafka 
        producer.send(record, (error) => {
            let timeDiffrence = global.stopTime - global.startTime;
            console.log('data send :' + error+' time taken:' + timeDiffrence+' to send:'+i++);
        });

        producer.on('error', (err) => {
            console.log('error in producer' + err);
        })
    }
};

exports.KafkaService = KafkaService;
exports.client = client;