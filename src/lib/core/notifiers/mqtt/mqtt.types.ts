export interface IMQTTMessage {
  topic: string;
  payload: string;
  qos: number;
  retain?: boolean;
}

export interface IMQTTClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  publish(message: IMQTTMessage): Promise<void>;
  subscribe(topic: string, callback: (message: IMQTTMessage) => void): Promise<void>;
  unsubscribe(topic: string): Promise<void>;
}

export interface IMQTTConfig {
  brokerUrl: string;
  clientId: string;
  username?: string;
  password?: string;
  port?: number;
  protocol?: 'mqtt' | 'mqtts';
}

export  interface IMqttEventHandler {
  topic: string;
  handle: (topic:string,message: string) => Promise<void>;
}