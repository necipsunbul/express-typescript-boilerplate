import BaseService from "../../../core/base/BaseService";
import UserRepository from "./UserRepository";

class UserService extends BaseService{
    repo : UserRepository = new UserRepository();
    getUser(param:string){
        // logic
    }
}