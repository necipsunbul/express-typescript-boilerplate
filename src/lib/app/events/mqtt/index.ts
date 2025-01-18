import ExampleSensorMqttHandler from './ExampleSensorMqttHandler';
import { IMqttEventHandler } from '../../../core/notifiers/mqtt/mqtt.types';

export default [
  new ExampleSensorMqttHandler()
] as IMqttEventHandler[];
