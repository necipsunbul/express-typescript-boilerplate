import { Model } from "mongoose";
import BaseMongoService from "../../../core/services/MongoDbService";
import {UserEntityModel} from "../../entities/user/UserEntityModel";
import UserSchema , {IUser} from "../../schemas/UserSchema";

export default class UserMongoService extends BaseMongoService<Model<IUser>, UserEntityModel>{
    constructor() {
        super(UserSchema);
    }
}