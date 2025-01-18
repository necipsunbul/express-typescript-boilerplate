import IMqttHandler from './IMqttHandler';

export default class MqttMessageHandler extends IMqttHandler {
  private messageHandlers: Map<string, (topic: string, message: string) => Promise<void>>;

  constructor() {
    super();
    this.messageHandlers = new Map();
  }

  registerHandler(topic: string, handler: (topic: string, message: string) => Promise<void>): void {
    this.messageHandlers.set(topic, handler);
  }

  async handleMessage(topic: string, message: string): Promise<void> {
    const handler = this.messageHandlers.get(topic);
    if (handler) {
      await handler(topic,message);
    }
  }

  get getTopics() {
    return Array.from(this.messageHandlers.keys());
  }
}