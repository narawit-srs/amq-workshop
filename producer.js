const readline = require('readline');
const fs = require('fs');
const kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient({
      kafkaHost: 'stmoneamqp:9092'
        ,ssl: true
        ,sslOptions:{
            rejectUnauthorized: false,
            ca: [fs.readFileSync('./cert/CARoot.pem', 'utf-8')],
            cert: [fs.readFileSync('./cert/certificate.pem', 'utf-8')],
            key: [fs.readFileSync('./cert/key.pem', 'utf-8')],
            passphrase: "ocp2020",
          },
        autoConnect: true,
        connectTimeout: 1000,
        requestTimeout: 1000
    }),
    producer = new Producer(client);


var topic = null;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
producer.on('ready', () => {
  const waitForUserInput = () => {
    rl.question('Command: ', (answer) => {
      if (answer == 'exit'){
        rl.close();
      } else if(isNaN(answer)) {
        console.log(topic);
        waitForUserInput();
      } else {
        let payload = [
          {
            topic: topic,
            messages: answer,
          }
        ];
        producer.send(payload, (err, data) => {
          waitForUserInput();
        });
      }
    });
    rl.on('SIGINT', () => {
      rl.close();
    });
  }

  const inputTopic = () => {
    rl.question('Topic: ', (answer) => {
      if(isNaN(answer)) {
        waitForUserInput();
        topic = answer;
      }
    });
  }


  inputTopic();
  waitForUserInput();
});
 
producer.on('error', (err) => {
  console.log(err);
});