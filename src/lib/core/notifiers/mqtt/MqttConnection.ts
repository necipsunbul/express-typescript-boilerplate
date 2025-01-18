import mqtt, { MqttClient } from 'mqtt';

export default class MqttConnection {
  public mqttClient: MqttClient;
  private readonly host: string;
  private readonly username: string;
  private readonly password: string;
  public isConnected: boolean = false;

  private static _instance?: MqttConnection;

  public static get instance() {
    if (!this._instance) this._instance = new MqttConnection();
    return this._instance;
  }

  private constructor() {
    const { MQTT_HOST, MQTT_USER, MQTT_PASSWORD } = process.env;
    this.host = MQTT_HOST as string;
    this.username = MQTT_USER as string;
    this.password = MQTT_PASSWORD as string;
    this.mqttClient = mqtt.connect(this.host, {
      clientId: 'server123',
      clean: true,
      connectTimeout: 4000,
      username: this.username,
      password: this.password,
      reconnectPeriod: 1000
    });
  }


  onError() {
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient?.end();
    });
  }

  onMessage(cb:  mqtt.OnMessageCallback) {
    this.mqttClient.on('message', cb);
  }

  onConnect(cb: () => void) {
    this.mqttClient.on('connect', () => {
      this.isConnected = true;
      cb();
      // service.subscribeTopics()
      /*  events.forEach((event) => {
          new event(this).handler();
        });
       */
    });
  }


  onClose() {
    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

}
