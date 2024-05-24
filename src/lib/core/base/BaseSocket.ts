import { Server } from "socket.io";

export default abstract class BaseSocketInterface {
    abstract io: Server;
    abstract eventName: String;
    abstract on(): void;
    abstract disconnect(): void;
}