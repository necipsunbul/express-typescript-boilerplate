import { Channel, Connection, Replies } from "amqplib";
import { v4 as uuidv4 } from "uuid";
import RabbitMqDriver from "./RabbitMqDriver";
import AppError from "../../error/AppError";
import {IRPCPublisher} from "../../../../types/custom";
import {durableStatus, noAckStatus} from "../../contants/RabbitMqConstants";

export default class RabbitMqClient implements IRPCPublisher {
    private connection?: Connection;
    protected queue: string;
    private channel?: Channel;
    private replyQueue?: Replies.AssertQueue;

    constructor(queue: string) {
        this.queue = queue;

    }

    private async connect() {
        await RabbitMqDriver.instance.connect();
        this.connection = RabbitMqDriver.instance.brokerConnection!;
        this.channel = RabbitMqDriver.instance.channel!;

    }

    async requestRPC<T extends object>(data: T) {
        await this.connect();
        const correlationId = uuidv4();
        this.replyQueue = await this.channel?.assertQueue("", { durable: durableStatus });
        return new Promise((resolve, reject) => {
            if (!this.replyQueue || !this.channel) return reject(new AppError(RpcClientEventErrorKeys.requestRejectedMessage));

            const timer = setTimeout(async () => {
                await this.channel?.deleteQueue(this.replyQueue!.queue);
                reject(new AppError('No response from service'));
            }, 30000);

            this.channel.consume(
                this.replyQueue.queue,
                (msg) => {
                    clearTimeout(timer);
                    this.channel?.deleteQueue(this.replyQueue!.queue);
                    if (!msg) return reject(new AppError(RpcClientEventErrorKeys.requestRejectedMessage));
                    if (msg.properties.correlationId === correlationId) {
                        resolve(JSON.parse(msg.content.toString()));
                        //  setTimeout(() => { this.connection?.close();   }, 500);
                    }
                },
                { noAck: noAckStatus },
            );

            this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)), {
                correlationId: correlationId,
                replyTo: this.replyQueue.queue,
                persistent: true
            });
        });
    }

    publish<T extends Object>(data: T) {
        if (!this.connection || !this.channel) {
            this.connect().then(() => {
                this.channel?.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)));
            })
        }else if(this.channel) {
            this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)));
        }
    }
}

export class RpcClientEventErrorKeys {
    static requestRejectedMessage = "Request Rejected";
}
