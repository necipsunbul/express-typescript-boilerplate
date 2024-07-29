import {ConsumeMessage} from "amqplib";
import IRabbitMQConsumer from "../../core/notifiers/rabbitMq/RabbitMqManager";
import AppError from "../../core/error/AppError";
import httpStatus from "http-status";
import ErrorResponse from "../../core/response/ErrorResponse";

import {EventKeys} from "../constants/eventConstants";


export class ExampleEvent extends IRabbitMQConsumer {
    constructor() {
        super(EventKeys.SAMPLE_KEY);
    }

    async onRequest(msg: ConsumeMessage | null) {
        if (!msg) return Promise.reject(new AppError(httpStatus[400], {httpStatus: httpStatus.INTERNAL_SERVER_ERROR}));
        try {

            this.reply(msg, {});
        } catch (e) {
            if (e instanceof Error) this.reply(msg, new ErrorResponse(e.message));
        } finally {
            this.channel?.ack(msg);
        }
    }
}
