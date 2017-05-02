import * as kafkaNode from 'kafka-node';

class KafkaClient {

  private _kafkaProducer: kafkaNode.Producer;
  private _client: kafkaNode.Client;

  constructor() {

    this._client = new kafkaNode.Client('localhost:2181', 'producer');
    this._kafkaProducer = new kafkaNode.Producer(this._client);

    this._kafkaProducer.on('ready', (data) => {
      console.log("Kafka producer is ready to send message!");
    });

    this._kafkaProducer.on('error', (err) => {
      console.log("Kafka producer failed to connect!", err);
    });
    console.log("Init: KafkaClient");
  }

  public publishEvent(eventPayload: any, topicName: string): Promise<any> {

    let payload = {
      topic: topicName,
      messages: JSON.stringify(eventPayload),
      partition: 0
    };

    return new Promise((resolve, reject) => {
      this._kafkaProducer.send([payload], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

export default new KafkaClient();