const express = require('express')
const app = express()
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['velomobile-01.srvs.cloudkafka.com:9094', 'velomobile-02.srvs.cloudkafka.com:9094'],
    authenticationTimeout: 100,
    sasl: {
        mechanism: 'plain', // scram-sha-256 or scram-sha-512
        username: 'nn0k2irb',
        password: 'QBi9c2ZnF-9qv10XPmeD8wKpOyn6hpp5'
    }
})
const producer = kafka.producer()

const prod = async () => {
    console.log('----------in producer ,connect')
    let e = await producer.connect()
    console.log('-----------', e)
    await producer.send({
        topic: 'nn0k2irb-default',
        messages: [
            { key: 'key1', value: 'hello world' },
            { key: 'key2', value: 'hey hey!' }
        ],
    })

    // before you exit your app
}

prod()
// const consumer = kafka.consumer({ groupId: 'my-group' })

/* async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'nn0k2irb-default' })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                key: message.key.toString(),
                value: message.value.toString()
            })
        },
    })
}
 */

process.on('SIGINT', async () => {
    // await consumer.disconnect()
    await producer.disconnect();
    process.exit(0);
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))