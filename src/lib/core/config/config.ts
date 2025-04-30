import dotEnv from './dotEnv';
import { redisConnect, redisDisconnect } from './redisConfig';
import { closeMongoDb, connectMongoDb } from './mongoConfig';
import { MqttConfig } from './mqttConfig';

export default async function appConfigs() {
  dotEnv();
  // await MqttConfig()
  await connectMongoDb();
  await redisConnect();
}

export const closeDataBase = async () => {
  await closeMongoDb();
  await redisDisconnect();
};
