const kafka = require('kafka-node');
const fs = require('fs');
const express = require('express');
const port = 3000;
const app = express();

const Consumer = kafka.Consumer,
 client = new kafka.KafkaClient({
  kafkaHost: '127.0.0.1:9092',
  // ssl: true,
  // sslOptions:{
  //    rejectUnauthorized: false,
  //    ca: [fs.readFileSync('./cert/CARoot.pem', 'utf-8')],
  //    cert: [fs.readFileSync('./cert/certificate.pem', 'utf-8')],
  //    key: [fs.readFileSync('./cert/key.pem', 'utf-8')],
  //    passphrase: "ocp2020",
  //  },
  autoConnect: true,
  connectTimeout: 1000,
  requestTimeout: 1000
 }),
 consumer = new Consumer(client, [ { topic: 'workshop' } ], { autoCommit: false });

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

consumer.on('message', function (message) {
  console.log(message);
});