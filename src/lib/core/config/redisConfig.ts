import { RedisClientType } from "redis";
import RedisDriver from "../cache/redis/RedisDriver";

export let redisClient: RedisClientType;
export let isReady: boolean;

export const redisConnect = async () => {
    const redis = RedisDriver.getInstance;
    redisClient = await redis.connect();
    isReady = redis.isReady;
};

export const redisDisconnect = async () => {
    await RedisDriver.getInstance.disconnect();
};
