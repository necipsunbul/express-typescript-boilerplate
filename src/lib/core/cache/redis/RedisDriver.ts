import { RedisClientType, createClient } from "redis";
import {getRedisConnectionString} from "../../config/redisConfig";

export default class RedisDriver {
    private static instance: RedisDriver;
    public static get getInstance(): RedisDriver {
        if (!this.instance) this.instance = new RedisDriver();
        return this.instance;
    }
    client: RedisClientType;
    isReady: boolean = false;
    private constructor() {
        this.client = createClient({
            url: getRedisConnectionString(),
        });
    }
    public async connect(): Promise<RedisClientType> {
        try {
            if (this.isReady) return this.client;
            /*
            this.client.on("error", (err) => console.log(`Redis Error: ${err}`));
            this.client.on("connect", () => console.log("Redis connected"));
            this.client.on("reconnecting", () => console.log("Redis reconnecting"));
             this.client.on("ready", () => {
               this.isReady = true;
             console.log("Redis ready!");
            });
            */
            this.isReady = true;
            return await this.client.connect();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async disconnect() {
        await this.client.quit();
        //await this.client.disconnect();
    }
}