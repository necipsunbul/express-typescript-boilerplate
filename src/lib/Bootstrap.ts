import express, { Express } from "express";
import Http from "http";
import FeatureLoader from "./app/loaders/FeatureLoader";
import SocketBuilder from "./core/socket/SocketBuilder";
import rabbitEvents from './app/events/rabbitMq';
import {error404, viewError} from "./app/middlewares/ErrorCatchMid";
import RabbitEventLoader from "./core/notifiers/rabbitMq/RabbitEventLoader";
import {SocketEventManager} from "./core/socket/SocketEventManager";
import SocketEvents from './app/events/socketEvents'
import CronEventLoader from "./core/notifiers/cronJobs/CronEventLoader";
import cronJobs from "./app/events/cronJobs";

export default class Application{
    app: Express;
    server: Http.Server;
    private readonly port: number;
    constructor() {
        this.port = +process.env.PORT || 3000;
        this.app = express();
        this.server = Http.createServer(this.app);
    }

    public loadFeatures(){
        const loader = new FeatureLoader(this.app);
        loader.build();
    }

    public async loadQueueEvents(){
        const eventLoader = new RabbitEventLoader(rabbitEvents);
        await eventLoader.build();
    }

    public async loadCronEvents(){
        const cronEventLoader = new CronEventLoader(cronJobs);
        cronEventLoader.build();
    }

    public configureSocket(){
        const eventManager = new SocketEventManager(SocketEvents);
        const socketBuilder = new SocketBuilder(this.server, eventManager);
        socketBuilder.build();
        this.app.use((req, res, next) => {
            req.event = socketBuilder.io;
            next();
        });
    }

    public configureCatchingResponseError(){
        this.app.use(error404);
        this.app.use(viewError);
    }

    public listen(): void{
        this.server.listen(this.port,() => {
            console.log(`Now listening port ${this.port}`);
        });
    }
}