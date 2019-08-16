let kafka = require("kafka-node");
const Transform = require('stream').Transform;
const ProducerStream = kafka.ProducerStream;
const _ = require('lodash');

const producer = new ProducerStream();

const stdinTransform = new Transform({
  objectMode: true,
  decodeStrings: true,
  transform (text, encoding, callback) {
    text = _.trim(text);
    console.log(`pushing message ${text} to ExampleTopic`);
    callback(null, {
      topic: 'ExampleTopic',
      messages: text
    });
  }
});

process.stdin.setEncoding('utf8');
process.stdin.pipe(stdinTransform).pipe(producer);
