import { IMqttEventHandler } from '../../../core/notifiers/mqtt/mqtt.types';


export default class ExampleSensorMqttHandler implements IMqttEventHandler {
   topic = '/door/status/main_door';

  async handle(topic: string, message: string): Promise<void> {
    console.log(`Received ${topic} to ${message}`);
  }
}
