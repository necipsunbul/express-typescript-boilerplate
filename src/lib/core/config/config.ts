import dotEnv from "./dotEnv";
import {redisConnect, redisDisconnect} from "./redisConfig";
import {closeMongoDb, connectMongoDb} from "./mongoConfig";

export default async function appConfigs(){
    dotEnv();
    // await connectMongoDb()
    await redisConnect();
}

export const closeDataBase = async () => {
    // await closeMongoDb();
    await redisDisconnect();
}