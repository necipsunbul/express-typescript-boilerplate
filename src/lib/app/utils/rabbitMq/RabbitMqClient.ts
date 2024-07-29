import { Channel, Connection, Replies } from "amqplib";
import { v4 as uuidv4 } from "uuid";
import RabbitMqDriver from "../../../core/notifiers/rabbitMq/RabbitMqDriver";
import AppError from "../../../core/error/AppError";
import {IRPCPublisher} from "../../../../types/custom";

export default class RabbitMqClient implements IRPCPublisher {
    private connection?: Connection;
    protected queue: string;
    private channel?: Channel;
    private replyQueue?: Replies.AssertQueue;

    constructor(queue: string) {
        this.queue = queue;

    }

    private async connect() {
        this.connection = await RabbitMqDriver.instance.connect();
        this.channel = RabbitMqDriver.instance.channel!;
        this.replyQueue = await this.channel?.assertQueue("", { durable: true });

    }

    async requestRPC<T extends object>(data: T) {
        await this.connect();
        const correlationId = uuidv4();

        return new Promise((resolve, reject) => {
            if (!this.replyQueue || !this.channel) return reject(new AppError(RpcClientEventErrorKeys.requestRejectedMessage));

            this.channel.consume(
                this.replyQueue.queue,
                (msg) => {
                    if (!msg) return reject(new AppError(RpcClientEventErrorKeys.requestRejectedMessage));
                    if (msg.properties.correlationId === correlationId) {
                        resolve(JSON.parse(msg.content.toString()));
                        setTimeout(() => {
                            this.connection?.close();
                        }, 500);
                    }
                },
                { noAck: true },
            );

            this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)), {
                correlationId: correlationId,
                replyTo: this.replyQueue.queue,
            });
        });
    }

    publish<T extends Object>(data: T) {
        this.connect().then(() => {
            this.channel?.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)));
            setTimeout(() => {
                this.connection?.close();
            }, 500);
        });
    }
}

export class RpcClientEventErrorKeys {
    static requestRejectedMessage = "Request Rejected";
}