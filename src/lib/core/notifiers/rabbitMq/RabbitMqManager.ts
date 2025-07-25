import { Channel, ConsumeMessage, ChannelModel } from 'amqplib';
import RabbitMqDriver from './RabbitMqDriver';
import { durableStatus, noAckStatus } from '../../contants/RabbitMqConstants';

export default abstract class IRabbitMQConsumer {
  abstract onRequest(msg: ConsumeMessage | null): Promise<void>;

  protected channel?: Channel;
  protected connection?: ChannelModel;

  queue: string;

  protected constructor(queue: string) {
    this.queue = IRabbitMQConsumer.manageTopicName(queue);
  }

  async start() {
    await RabbitMqDriver.instance.connect();
    this.connection = RabbitMqDriver.instance.brokerConnection!;
    this.channel = RabbitMqDriver.instance.channel!;
    await this.channel.assertQueue(this.queue, { durable: durableStatus });
    await this.channel.prefetch(1);
    await this.channel.consume(this.queue, this.onRequest.bind(this), { noAck: noAckStatus });
  }

  reply(msg: ConsumeMessage, data: object) {
    if (msg.properties.correlationId && msg.properties.replyTo) {
      this.channel?.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(data)), {
        correlationId: msg.properties.correlationId,
      });
    }
  }

  public static manageTopicName(topic: string) {
    return process.env.RABBITMQ_PREFIX ? `${process.env.RABBITMQ_PREFIX}/${topic}` : topic;
  }
}
