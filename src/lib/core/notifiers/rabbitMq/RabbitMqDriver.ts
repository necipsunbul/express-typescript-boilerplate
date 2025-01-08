import amqp, { Channel, Connection } from "amqplib";
import rabbitMqConnectionString from "../../config/rabbitMqConfig";

export default class RabbitMqDriver {
    public brokerConnection: Connection | null = null;
    private static _instance?: RabbitMqDriver;
    private retryConnectingTime = 5000;
    private constructor() {}

    public channel?: Channel | null = null;

    public static get instance(): RabbitMqDriver {
        if (!this._instance) this._instance = new RabbitMqDriver();
        return this._instance;
    }

    async connect() : Promise<void> {
        try {
            if (this.brokerConnection && this.channel) return;
            this.brokerConnection = await amqp.connect(rabbitMqConnectionString(), { heartbeat: 60 });
            this.channel = await this.brokerConnection.createChannel();
            this.brokerConnection.on("close", async (err) => {
                console.log('closed rabbit mq', Math.random(),err);
                this.channel = null;
                this.brokerConnection = null;
                setTimeout(() => this.connect(), this.retryConnectingTime);
            });
            this.brokerConnection.on("error", (err) => {
                console.error("RabbitMQ connection error:", err);
            });
        } catch (e) {
            console.error("Error connecting to RabbitMQ:", e);
            setTimeout(() => this.connect(), this.retryConnectingTime);
            //  console.log(e);
        }
    }

    close() {
        this.brokerConnection?.close();
        this.brokerConnection = null;
        this.channel = null;
    }
}
