import {FilterQuery, Model, ProjectionType, Types, UpdateQuery} from "mongoose";
import BaseEntityModel from "../base/BaseEntityModel";
import BaseDbService from "../base/BaseDbService";
import ErrorMessageConstants from "../contants/ErrorMessageContants";

export default class BaseMongoService<T extends Model<any>, M extends BaseEntityModel> extends BaseDbService {
    constructor(private readonly model: T) {
        super();
    }
    save(data: M) {
        const willSaveData = new this.model(data);
        return willSaveData.save();
    }
    findAll(condition :FilterQuery<any> = {}, projection : ProjectionType<any> = {}) {
        return this.model.find(condition, projection);
    }
    findOne(condition :FilterQuery<any> = {},projection : ProjectionType<any> = {}) {
        return this.model.findOne(condition,projection);
    }
    async deleteOne(condition : FilterQuery<any> = {}) {
        const result = await this.model.deleteOne(condition);
        return result.deletedCount;
    }
    deleteMany(condition:FilterQuery<any> = {}) {
        return this.model.deleteMany(condition);
    }
    async updateOne(condition:FilterQuery<any> = {}, data: UpdateQuery<M>) {
        const result = await this.model.updateOne(condition, data);
        return result.modifiedCount;
    }
    findOneAndUpdate(condition :FilterQuery<any> = {}, data: UpdateQuery<M>) {
        return this.model.findOneAndUpdate(condition, data, { upsert: true });
    }
    updateMany(condition:FilterQuery<any> = {}, data: UpdateQuery<M>) {
        return this.model.updateMany(condition, data);
    }
    protected  isObjectId(id:any) : boolean{
        return Types.ObjectId.isValid(id);
    }
    protected convertObjectId(id:string) : Types.ObjectId | false {
        if(!this.isObjectId(id)) throw new Error(ErrorMessageConstants.invalidObjectIdFormat);
        return new Types.ObjectId(id);
    }
}