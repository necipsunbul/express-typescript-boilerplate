import amqp, { Channel, Connection } from "amqplib";
import rabbitMqConnectionString from "../../config/rabbitMqConfig";

export default class RabbitMqDriver {
    private brokerConnection: Connection | null = null;
    private static _instance?: RabbitMqDriver;
    private readonly connectionString:string;
    private constructor() {
        this.connectionString = rabbitMqConnectionString();
    }

    public channel?: Channel | null = null;

    public static get instance(): RabbitMqDriver {
        if (!this._instance) this._instance = new RabbitMqDriver();
        return this._instance;
    }

    async connect() {
        try {
            if (this.channel !== null && this.brokerConnection !== null) return;
            this.brokerConnection = await amqp.connect(this.connectionString);
            this.channel = await this.brokerConnection.createChannel();
            return this.brokerConnection;
        } catch (e) {
            throw e;
        }
    }

    close() {
        this.brokerConnection?.close();
        this.brokerConnection = null;
        this.channel = null;
    }
}