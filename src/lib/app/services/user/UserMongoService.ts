import { Model } from "mongoose";
import BaseMongoService from "../../../core/services/MongoDbService";
import {UserEntity} from "./UserEntity";
import UserSchema , {IUser} from "../../schemas/UserSchema";

export default class UserMongoService extends BaseMongoService<Model<IUser>, UserEntity>{
    constructor() {
        super(UserSchema);
    }
}