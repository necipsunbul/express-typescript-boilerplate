import BaseDbService from "../base/BaseDbService";
import { Model, ModelStatic, WhereOptions, UniqueConstraintError, Order, FindAttributeOptions, Includeable } from "sequelize";
import sequelize from "../config/postgresConfig";
import AppError from "../error/AppError";
import httpStatus from "http-status";

export interface PostgresProps<T> {
    order?: Order;
    limit?: number;
    attributes?: FindAttributeOptions;
    include?: Includeable | Includeable[];
}

export default class PostgresqlService<T extends Model, E> extends BaseDbService {
    protected driver = sequelize;
    constructor(public readonly model: ModelStatic<T>) {
        super();
    }

    private getQueryOptions(condition?: WhereOptions<T["_attributes"]>, props?: PostgresProps<T>) {
        return {
            where: condition,
            order: props?.order,
            limit: props?.limit,
            attributes: props?.attributes,
            include: props?.include,
        };
    }

    async save(data: E) {
        const transaction = await this.driver.transaction();
        try {
            const newData = await this.model.create(data as any, { transaction });
            await transaction.commit();
            return newData;
        } catch (e) {
            console.log(e);
            if (e instanceof UniqueConstraintError) {
                throw new AppError(e.original.message, { httpStatus: httpStatus.BAD_REQUEST });
            }
            await transaction.rollback();
            throw e;
        }
    }

    findAll(condition?: WhereOptions<T["_attributes"]>, props?: PostgresProps<T>): Promise<T[]> {
        return this.model.findAll(this.getQueryOptions(condition, props));
    }

    findOne(condition: WhereOptions<T["_attributes"]>, props?: PostgresProps<T>): Promise<T | null> {
        return this.model.findOne(this.getQueryOptions(condition, props));
    }

    findById(id: string): Promise<T | null> {
        return this.model.findByPk(id);
    }

    async update(condition: WhereOptions<T["_attributes"]>, data: E): Promise<[number, T[]]> {
        const transaction = await this.driver.transaction();
        try {
            const result = await this.model.update(data, {
                where: condition,
                returning: true,
                transaction,
            });
            await transaction.commit();
            return result;
        } catch (e) {
            if (e instanceof UniqueConstraintError) {
                throw new AppError(e.original.message, { httpStatus: httpStatus.BAD_REQUEST });
            }
            await transaction.rollback();
            throw e;
        }
    }

    async delete(condition: WhereOptions<T["_attributes"]>): Promise<number> {
        const transaction = await this.driver.transaction();
        try {
            const result = await this.model.destroy({
                where: condition,
                transaction,
            });
            await transaction.commit();
            return result;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async documentCount(condition?: WhereOptions<T["_attributes"]>) {
        return this.model.count({
            where: condition,
        });
    }
}