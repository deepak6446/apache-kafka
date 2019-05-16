# [apache kafka](https://kafka.apache.org/quickstart)

## Quick start

### Step 1: [Download apache kafka](https://www.apache.org/dyn/closer.cgi?path=/kafka/1.1.0/kafka_2.11-1.1.0.tgz)

### Step 2: Start the server
* bin/zookeeper-server-start.sh config/zookeeper.properties
* bin/kafka-server-start.sh config/server.properties
...
### Step 3: Install dependencies 
npm i

### Step 4: start producer
node producer.js

### Step 5: start consumer
node consumer.js
    
## To increase performance
In config/server.properties increase num.partitions to number of consumers

Made with ♥ by Deepak ([deepak6446](http://github.com/deepak6446))

 #[Free credentials](https://api.cloudkarafka.com/console/06404282-8285-469b-8b30-096f5dc7bbad/details)
