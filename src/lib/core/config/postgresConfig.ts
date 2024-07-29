import { Dialect, Sequelize } from "sequelize";
import dotEnv from "./dotEnv";

dotEnv();

const dialect: Dialect = "postgres";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB,POSTGRES_PORT } = process.env;
const sequelize = new Sequelize(POSTGRES_DB!, POSTGRES_USER!, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    port: +POSTGRES_PORT!,
    dialect: dialect,
    logging: false,
});

export default sequelize;

export const syncPostgres = async () => {
    // set stored procedures & triggers
    await sequelize.sync();
};