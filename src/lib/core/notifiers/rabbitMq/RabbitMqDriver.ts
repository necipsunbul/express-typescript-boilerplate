import amqp, { Channel, Connection } from "amqplib";
import rabbitMqConnectionString from "../../config/rabbitMqConfig";

export default class RabbitMqDriver {
    public brokerConnection: Connection | null = null;
    private static _instance?: RabbitMqDriver;
    private readonly connectionString:string;
    private retryConnectingTime = 5000;
    private constructor() {
        this.connectionString = rabbitMqConnectionString();
    }

    public channel?: Channel | null = null;

    public static get instance(): RabbitMqDriver {
        if (!this._instance) this._instance = new RabbitMqDriver();
        return this._instance;
    }

    async connect(): Promise<void> {
        try {
           // if (this.channel !== null && this.brokerConnection !== null) return;
            this.brokerConnection = await amqp.connect(this.connectionString,{ heartbeat: 60 });
            this.channel = await this.brokerConnection.createChannel();
            this.brokerConnection.on("close", async (err) => {
                this.channel = null;
                this.brokerConnection = null;
                setTimeout(() => this.connect(), this.retryConnectingTime);
            });
            this.brokerConnection.on("error", (err) => {
                console.error("RabbitMQ connection error:", err);
            });
        } catch (e) {
            setTimeout(() => this.connect(), this.retryConnectingTime);
        }
    }

    close() {
        this.brokerConnection?.close();
        this.brokerConnection = null;
        this.channel = null;
    }
}