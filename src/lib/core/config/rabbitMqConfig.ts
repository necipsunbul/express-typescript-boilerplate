import {ApplicationMode} from "../contants/SystemContants";

const rabbitMqConnectionString = () => {
    const { RABBITMQ_USER, RABBITMQ_PASSWORD, RABBITMQ_HOST,RABBITMQ_PORT } = process.env;
    const devString = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;
    const productionString = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;
    return process.env.NODE_ENV === ApplicationMode.dev ? devString : productionString;
};

export default rabbitMqConnectionString;