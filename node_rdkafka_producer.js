const express = require('express');
var Kafka = require('node-rdkafka');

/* var producer = new Kafka.Producer({
    'metadata.broker.list': 'kafka-35a0d2fe-deepak-1af7.aivencloud.com:19522',
    'debug': 'security',
    'security.protocol': 'sasl_plaintext',
    'sasl.username': 'avnadmins',
    'sasl.password': 'vqjlgohtqj4k1ung',
    'sasl.mechanisms': 'PLAIN',
    'enable.auto.commit': false,
    'dr_cb': true
}); */
var producer = new Kafka.Producer({
    // 'debug': 'security',
    'metadata.broker.list': 'kafka-324caefb-deepak-c0d5.aivencloud.com:28225',
    'group.id': 'test',
    'security.protocol': 'ssl',
    'ssl.key.location': './service.key',
    'ssl.certificate.location': './service.cert',
    'ssl.ca.location': './ca.pem'
});
/* 
'debug': 'security', 'all',
 */
// console.log(Kafka.features)
producer.connect();

producer.on('ready', function () {
    console.log('producer is ready  ')
    try {
        producer.produce(
            'test',  // topic to send the message to
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
    // producer.disconnect();
});

producer.on('error', (err) => {
    console.log('--------error in producer:', err);
})
producer.on('disconnected', (err) => {
    console.log('--------disconnected in producer:', err);
})
producer.on('event', (err) => {
    console.log('--------event in producer:', err);
})
producer.on('event.log', (err) => {
    console.log('--------event.log in producer:', err);
})
producer.on('event.stats', (err) => {
    console.log('--------event.stats in producer:', err);
})
producer.on('event.error', (err) => {
    console.log('--------event.error in producer:', err);
});
producer.on('event.throttle', (err) => {
    console.log('--------event.throttle in producer:', err);
})

let app = express()
const server = app.listen(3001, () => console.log('server connected'))