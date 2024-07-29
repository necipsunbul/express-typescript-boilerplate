import { Model, DataTypes } from "sequelize";
import PostgresqlService from "../../lib/core/services/PostgresqlService";
import sequelize from "../../lib/core/config/postgresConfig";


class TestModel extends Model {}
TestModel.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: DataTypes.STRING,
    },
    { sequelize, tableName: "testmodel" }
);

class TestEntity {
    constructor(public id?: string, public name?: string) {}
}

describe("PostgresqlService", () => {
    let service: PostgresqlService<TestModel, TestEntity>;

    beforeAll(async () => {
        await sequelize.sync();
        service = new PostgresqlService(TestModel);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await TestModel.drop();
        await sequelize.close();
    });

    it("should save a new model instance", async () => {
        const data = new TestEntity("1", "test");
        jest.spyOn(TestModel, "create").mockResolvedValue(data as any);
        const result = await service.save(data);
        expect(result).toEqual(data);
        expect(TestModel.create).toHaveBeenCalledWith(data, expect.anything());
    });

    it("should find all model instances", async () => {
        const data = [{ id: "1", name: "test" }];
        jest.spyOn(TestModel, "findAll").mockResolvedValue(data as any);
        const result = await service.findAll();
        expect(result).toEqual(data);
        expect(TestModel.findAll).toHaveBeenCalled();
    });

    it("should find a model instance by id", async () => {
        const data = { id: "1", name: "test" };
        jest.spyOn(TestModel, "findByPk").mockResolvedValue(data as any);
        const result = await service.findById("1");
        expect(result).toEqual(data);
        expect(TestModel.findByPk).toHaveBeenCalledWith("1");
    });

    it("should update a model instance", async () => {
        const condition = { id: "1" };
        const data = { name: "updated" };
        const updateResult = [1, [{ id: "1", name: "updated" }]];
        jest.spyOn(TestModel, "update").mockResolvedValue(updateResult as any);
        const result = await service.update(condition, data);
        expect(result).toEqual(updateResult);
        expect(TestModel.update).toHaveBeenCalledWith(data, {
            where: condition,
            returning: true,
            transaction: expect.anything(),
        });
    });

    it("should delete a model instance", async () => {
        const condition = { id: "1" };
        jest.spyOn(TestModel, "destroy").mockResolvedValue(1);
        const result = await service.delete(condition);
        expect(result).toBe(1);
        expect(TestModel.destroy).toHaveBeenCalledWith({ where: condition, transaction: expect.anything() });
    });
});