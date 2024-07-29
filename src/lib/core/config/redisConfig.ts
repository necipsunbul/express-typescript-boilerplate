import {RedisClientType} from "redis";
import RedisDriver from "../cache/redis/RedisDriver";
import {ApplicationMode} from "../contants/SystemContants";


export let redisClient: RedisClientType;
export let isReady: boolean;

export const getRedisConnectionString = () => {
    const {REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD, REDIS_SERVER} =
        process.env;
    // const devString = `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_SERVER}:${REDIS_PORT}`;
    const devString = `redis://${REDIS_SERVER}:${REDIS_PORT}`;
    const productionString = `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_SERVER}:${REDIS_PORT}`;
    return process.env.NODE_ENV === ApplicationMode.dev ? devString : productionString;
}

export const redisConnect = async () => {
    const redis = RedisDriver.getInstance;
    redisClient = await redis.connect();
    isReady = redis.isReady;
};

export const redisDisconnect = async () => {
    await RedisDriver.getInstance.disconnect();
};
