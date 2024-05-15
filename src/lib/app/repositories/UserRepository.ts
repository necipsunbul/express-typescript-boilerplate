import {BaseRepository} from "../../core/base/BaseRepository";
import UserMongoService from "../services/user/UserMongoService";
import UserRedisService from "../services/user/UserRedisService";

export default  class UserRepository extends BaseRepository<UserMongoService, UserRedisService>{
    protected cacheService: UserRedisService;
    protected dbService: UserMongoService;
    constructor() {
        super();
        this.cacheService = new UserRedisService();
        this.dbService = new UserMongoService();
    }
}