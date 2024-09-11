
import {Socket,Server} from "socket.io";
import {ISocketEvent} from "../../../types/custom";

export class SocketEventManager {
    private events: Map<string, ISocketEvent> = new Map();

    constructor(events: ISocketEvent[]) {
        events.forEach(event =>  this.registerEvent(event));
    }

    private registerEvent(event: ISocketEvent): void {
        this.events.set(event.name, event);
    }

    handleConnection(io: Server, socket: Socket): void {
        this.events.forEach((event, eventName) => {
            socket.on(eventName, (...args: any[]) => {
                event.handle(io, socket, ...args);
            });
        });
    }

    handleClosedConnection(io: Server, socket: Socket): void {
        this.events.forEach((event, eventName) => {
            event.handleClosed(io, socket)
            socket.off(eventName, (...args: any[]) => { });
        });
    }
}