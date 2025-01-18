import MqttMessageHandler from './MqttMessageHandler';
import { IMQTTMessage } from './mqtt.types';

import MqttConnection from './MqttConnection';

export default class MqttService {
  private readonly connection: MqttConnection;
  private messageHandler: MqttMessageHandler;

  constructor(client: MqttConnection) {
    this.connection = client;
    this.messageHandler = new MqttMessageHandler();
  }

  registerMessageHandler(topic: string, handler: (topic: string, message: string) => Promise<void>): void {
    this.messageHandler.registerHandler(topic, handler);
    this.connection.mqttClient.subscribe(topic, (error) => {
      if (error) throw error;
    });
  }


  subscribeTopics() {
    this.messageHandler.getTopics.forEach(topic => this.connection.mqttClient.subscribe(topic, (error) => {
      if (error) throw error;
      // console.log(`subscribeTopics for topic: ${topic}`);
    }));
  }


  init() {
    try {
      this.connection.onConnect(() => {
        console.log(`mqtt client connected`);
        this.subscribeTopics();
      });
      this.connection.onClose();
      this.connection.onError();
      this.connection.onMessage(async (topic, message) => {
        await this.messageHandler.handleMessage(topic, message.toString());
      });
    } catch (e) {
      throw e;
    }
  }
}