const express = require('express');
var Kafka = require('node-rdkafka');

var producer = new Kafka.Producer({
    'metadata.broker.list': 'kafka-35a0d2fe-deepak-1af7.aivencloud.com:19522',
    'security.protocol': 'ssl',
    'ssl.key.location': 'service.key',
    'ssl.certificate.location': 'service.cert',
    'ssl.ca.location': 'ca.pem',
    'dr_cb': true
});

producer.connect((e, d) => {
    console.log('----->error connect:', e, d)
})

producer.on('ready', function () {
    console.log('producer is ready  ')
    try {
        producer.produce(
            'demo-topic',  // topic to send the message to
            null,  // partition, null for librdkafka default partitioner
            new Buffer('Hello world!'),  // value
            null,  // optional key
            Date.now()  // optional timestamp
        );
        // console.log('---->producer', producer._metadata)
        // producer.flush(2000);
        console.log('Message sent successfully');
    } catch (err) {
        console.log('Failed to send message', err);
    }
    producer.disconnect();
});

producer.on('error', (err) => {
    console.log('--------error in producer:', err);
})

let app = express()
const server = app.listen(3001, () => console.log('server connected'))