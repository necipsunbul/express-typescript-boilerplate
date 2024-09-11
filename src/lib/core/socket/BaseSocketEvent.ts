
import { Server, Socket } from 'socket.io';
import {ISocketEvent} from "../../../types/custom";

export abstract class BaseSocketEvent implements ISocketEvent {
    protected constructor(public name: string) {}
    abstract handle(io: Server, socket: Socket, ...args: any[]): void;
}