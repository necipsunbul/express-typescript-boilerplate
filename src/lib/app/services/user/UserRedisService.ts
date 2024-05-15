import RedisManager from "../../../core/cache/redis/RedisManager";


export default class UserRedisService extends RedisManager{
    private redisKey:string = UserRedisServiceKeys.redisKey;
    setData(field: string,data: string) {
        return this.hSet(this.redisKey, field,data);
    }

    setExData(data: string) {
        return this.setEx(this.redisKey, data, UserRedisServiceKeys.tempCacheSecond);
    }

    getData(field:string) {
        return this.hGet(this.redisKey,field);
    }

    deleteData(field:string) {
        return this.hDel(this.redisKey,field);
    }
}


class UserRedisServiceKeys{
    static redisKey : string = "user";
    static tempCacheSecond : number = 10;
}