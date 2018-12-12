// const express = require('express');
var Kafka = require('node-rdkafka');

var consumer = new Kafka.KafkaConsumer({
    'metadata.broker.list': 'kafka-324caefb-deepak-c0d5.aivencloud.com:28225',
    'group.id': 'test',
    'security.protocol': 'ssl',
    'ssl.key.location': './service.key',
    'ssl.certificate.location': './service.cert',
    'ssl.ca.location': './ca.pem'
}, {});

consumer.connect();
consumer.on('event.log', (err) => {
    console.log('--------event.log in consumer:', err);
})
console.log('=======================================')
consumer.on('ready', () => {
    console.log('============ready===========================')
    consumer.subscribe(['test']);
    console.log(`kafka data--------------------------------` + data.value.toString());consumer.consume((err, data) => {

    });
})
consumer.on('data', (data) => {
    console.log(`kafka data--------------------------------` + data.value.toString());
});

consumer.on('error', (err) => {
    console.log('--------error in consumer:', err);
})
consumer.on('disconnected', (err) => {
    console.log('--------disconnected in consumer:', err);
})
consumer.on('event', (err) => {
    console.log('--------event in consumer:', err);
})
consumer.on('event.log', (err) => {
    console.log('--------event.log in consumer:', err);
})
consumer.on('event.stats', (err) => {
    console.log('--------event.stats in consumer:', err);
})
consumer.on('event.error', (err) => {
    console.log('--------event.error in consumer:', err);
});
consumer.on('event.throttle', (err) => {
    console.log('--------event.throttle in consumer:', err);
})

// let app = express()
// const server = app.listen(3001, () => console.log('server connected'))