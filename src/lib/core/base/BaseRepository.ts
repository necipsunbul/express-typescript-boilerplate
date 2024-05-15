import BaseService from "./BaseService";
import RedisManager from "../cache/redis/RedisManager";

export abstract class BaseRepository<T extends BaseService,R extends RedisManager>{
    protected abstract dbService: T;
    protected abstract cacheService: R;
}