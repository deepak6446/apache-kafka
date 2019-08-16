const events_1 = require("events");
try {
    process.setMaxListeners(0);
    events_1.EventEmitter.defaultMaxListeners = Infinity;
}
catch (e) {
    console.log('error:', e)
}

var kafka = require("kafka-node")
global.config = require('./env/local.json');

const client = new kafka.KafkaClient(
    {
        kafkaHost: global.config.brokerUrl,
        requestTimeout: 10000000,
        maxAsyncRequests: 10000
    }
);

const producer = new kafka.Producer(client, {
    // Configuration for when to consider a message as acknowledged, default 1
    requireAcks: 0,
    // The amount of time in milliseconds to wait for all acks before considered, default 100ms
    ackTimeoutMs: 100000,
    // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
    partitionerType: 2
});

producer.on("ready", () => {
    console.log("Kafka Producer is connected and ready.");
});

producer.on("error", (error) => {
    console.error('error in connection : ', error);
});
let i = 0
const KafkaService = {
    sendRecord: (logs) => {
        if (!Object.keys(logs).length) {
            console.log('log must not be empty.');
            return
        }

        const buffer = new Buffer.from(JSON.stringify(logs));
        // Create a new payload
        const record = [
            {
                topic: global.config.topic,   //which topic to send record
                messages: buffer,
                // attributes: 1 /* 1 = Use GZip compression for the payload */
            }
        ];

        //Send record to Kafka 
        producer.send(record, (error) => {
            let timeDiffrence = global.stopTime - global.startTime;
            console.log('data send :' + error + ' time taken:' + timeDiffrence + ' to send:' + i++);
        });

        producer.on('error', (err) => {
            console.log('error in producer' + err);
        })
    }
};

exports.KafkaService = KafkaService;
exports.client = client;