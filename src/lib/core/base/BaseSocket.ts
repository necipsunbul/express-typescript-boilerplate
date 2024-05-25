import { Socket, Server } from "socket.io";

export default abstract class BaseSocketInterface {
    abstract io: Server;
    abstract socket: Socket;
    abstract eventName: String;
    abstract on(): void;
    abstract disconnect(): void;
}