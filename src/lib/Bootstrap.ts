import express, { Express } from "express";
import Http from "http";
import LoadFeatures from "./app/loaders/LoadFeatures";
import SocketBuilder from "./core/socket/SocketBuilder";
import events from './app/events';
import {error404, viewError} from "./app/middlewares/ErrorCatchMid";
import EventLoader from "./app/loaders/EventLoader";
import {SocketEventManager} from "./core/socket/SocketEventManager";
import SocketEvents from './app/socket_events'

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
        const loader = new LoadFeatures(this.app);
        loader.build();
    }

    public async loadQueueEvents(){
        const eventLoader = new EventLoader(events);
        await eventLoader.build();
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
          //  console.log(`Now listening port ${this.port}`);
        });
    }
}