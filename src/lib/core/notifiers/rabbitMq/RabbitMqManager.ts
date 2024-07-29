import { Channel, ConsumeMessage, Connection } from "amqplib";
import RabbitMqDriver from "./RabbitMqDriver";

export default abstract class IRabbitMQConsumer {
    abstract onRequest(msg: ConsumeMessage | null): Promise<void>;
    protected channel?: Channel;
    protected connection?: Connection;

    queue: string;
    protected constructor(queue: string) {
        this.queue = queue;
    }

    async start() {
        this.connection = await RabbitMqDriver.instance.connect();
        this.channel = RabbitMqDriver.instance.channel!;
        await this.channel?.assertQueue(this.queue, { durable: false });
        // this.channel?.prefetch(40);
        this.channel?.consume(this.queue, this.onRequest.bind(this));
    }

    reply(msg: ConsumeMessage, data: object) {
        if (msg.properties.correlationId && msg.properties.replyTo) {
            this.channel?.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(data)), {
                correlationId: msg.properties.correlationId,
            });
        }
    }
}