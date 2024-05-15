import BaseRepository from "../../../core/base/BaseRepository";
import UserMongoService from "./UserMongoService";
import UserRedisService from "./UserRedisService";

class UserRepository extends BaseRepository<UserMongoService,UserRedisService>{
    protected cacheService: UserRedisService;
    protected dbService: UserMongoService;

    constructor() {
        super();
        this.cacheService = new UserRedisService();
        this.dbService = new UserMongoService();
    }
}

export default UserRepository;

