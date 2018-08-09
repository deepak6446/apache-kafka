/**
 * free kafka : https://console.aiven.io/oneservice.html?name=kafka-35a0d2fe#overview_tab
 */
const express = require('express');
var Kafka = require('node-rdkafka');
// console.log(Kafka.features); // this should print 'ssl', among other things

const consumerFun = () => {
    const consumer = new Kafka.KafkaConsumer({
        'metadata.broker.list': 'kafka-35a0d2fe-deepak-1af7.aivencloud.com:19522',
        'group.id': 'demo-consumer-group',
        'security.protocol': 'ssl',
        'ssl.key.location': './service.key',
        'ssl.certificate.location': './service.cert',
        'ssl.ca.location': './ca.pem'
    }, {});
    consumer.connect()
    consumer.on('event.error', (arg) => {
        console.log(`------consumer envets.${JSON.stringify(arg)}`);
    });
    consumer.on('disconnect', (arg) => {
        console.log(`-------consumer disconnected.${JSON.stringify(arg)}`);
    });
    consumer.on('disconnected', (arg) => {
        console.log(`-------consumer disconnected.${JSON.stringify(arg)}`);
    });
    consumer.on('ready', (arg) => {
        console.log(`consumer ready.${JSON.stringify(arg)}`);
        consumer.subscribe(['demo-topic']);
        consumer.consume();
    }).on('data', function (data) {
        console.log('----------------data', data.value.toString());
    });
}
consumerFun()


let app = express()
const server = app.listen(3000, () => console.log('server connected'))