import {Model, Types, UpdateQuery} from "mongoose";
import BaseEntityModel from "../base/BaseEntityModel";
import BaseService from "../base/BaseService";

export default class BaseMongoService<T extends Model<any>, M extends BaseEntityModel> extends BaseService {
    constructor(private readonly model: T) {
        super();
    }
    save(data: M) {
        const willSaveData = new this.model(data);
        return willSaveData.save();
    }
    findAll(condition = {}) {
        return this.model.find(condition);
    }
    findOne(condition = {}) {
        return this.model.findOne(condition);
    }
    async deleteOne(condition = {}) {
        const result = await this.model.deleteOne(condition);
        return result.deletedCount;
    }
    deleteMany(condition = {}) {
        return this.model.deleteMany(condition);
    }
    async updateOne(condition = {}, data: UpdateQuery<M>) {
        const result = await this.model.updateOne(condition, data);
        return result.modifiedCount;
    }
    findOneAndUpdate(condition = {}, data: UpdateQuery<M>) {
        return this.model.findOneAndUpdate(condition, data, { upsert: true });
    }
    updateMany(condition = {}, data: UpdateQuery<M>) {
        return this.model.updateMany(condition, data);
    }
    protected  isObjectId(id:any) : boolean{
        return Types.ObjectId.isValid(id);
    }
    protected convertObjectId(id:string) : Types.ObjectId | false {
        if(!this.isObjectId(id)) return false;
        return new Types.ObjectId(id);
    }
}