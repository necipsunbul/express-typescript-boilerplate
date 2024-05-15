import mongoose from "mongoose";
export const connectMongoDb = async () => {
    const {
        MONGO_PORT,
        MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_HOST,
        MONGO_DATABASE,
    } = process.env;
    const uri: string = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
    try {
        await mongoose.connect(uri);
        mongoose.Promise = global.Promise;
    } catch (e) {
        throw e;
    }
};

export const closeMongoDb = async () => {
    await mongoose.connection.close();
};