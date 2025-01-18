import MqttConnection from '../notifiers/mqtt/MqttConnection';
import MqttService from '../notifiers/mqtt/MqttService';
import MqttEvents from '../../app/events/mqtt'

export async function MqttConfig(){
  const mqtt = MqttConnection.instance;

  const mqttService = new MqttService(mqtt);

  MqttEvents.forEach(event => {
    mqttService.registerMessageHandler(event.topic, event.handle);
  });

  mqttService.init();
}