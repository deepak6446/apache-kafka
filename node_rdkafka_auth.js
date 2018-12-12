/**
 * free kafka : https://console.aiven.io/oneservice.html?name=kafka-35a0d2fe#overview_tab
 */
const express = require('express');
var Kafka = require('node-rdkafka');
// console.log(Kafka.features); // this should print 'ssl', among other things

const consumerFun = () => {
    const consumer = new Kafka.KafkaConsumer({
        'debug': 'security',
        'metadata.broker.list': 'kafka-21b376e4-deepak-c0d5.aivencloud.com:28225',
        'group.id': 'test',
        'security.protocol': 'ssl',
        'ssl.key.location': './service.key',
        'ssl.certificate.location': './service.cert',
        'ssl.ca.location': './ca.pem',
    }, {});
    consumer.connect()
    console.log('-----------connection req send')
    consumer.on('event.error', (arg) => {
        console.log(`------consumer envets.error:${JSON.stringify(arg)}`);
    });
    consumer.on('disconnect', (arg) => {
        console.log(`-------consumer disconnected.${JSON.stringify(arg)}`);
    });
    consumer.on('disconnected', (arg) => {
        console.log(`-------consumer disconnected.${JSON.stringify(arg)}`);
    });
    consumer.on('event.log', (err) => {
        // console.log('--------event.log in conusmer:', err);
    })
    consumer.on('ready', (arg) => {
        console.log(`consumer ready.${JSON.stringify(arg)}`);
        consumer.subscribe(['test']);
        consumer.consume();
    }).on('data', function (data) {
        console.log('----------------data', data.value.toString());
    });
}
consumerFun()


let app = express()
const server = app.listen(3123, () => console.log('server connected'))