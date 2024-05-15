import BaseRepository from "../../../core/base/BaseRepository";
import UserMongoService from "./UserMongoService";
import UserRedisService from "./UserRedisService";

class UserRepository extends BaseRepository<UserMongoService>{
    protected dbService;
    protected cacheService: UserRedisService;

    constructor() {
        super();
        this.cacheService = new UserRedisService();
        this.dbService = new UserMongoService();
    }
}

export default UserRepository;

