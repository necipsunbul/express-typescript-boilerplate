export default abstract class IMqttHandler {


  protected constructor() {

  }

  abstract handleMessage(topic: string, message: string): Promise<void>;
}