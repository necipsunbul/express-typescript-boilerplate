import { Socket, Server } from "socket.io";
import {BaseSocketEvent} from "../../../core/socket/BaseSocketEvent";
import SocketEventKeys from "../../constants/socketEventKeys";



export default class ChatMessageEvent extends BaseSocketEvent {
    constructor() {
        super(SocketEventKeys.RECEIVE_CHAT_MESSAGE);
    }

    handle(io: Server, socket: Socket, message: string): void {
        console.log('Message received:', message);
        io.emit('chat message', message);
    }

    handleClosed(io: Server, socket: Socket, ...args: any[]): void {
        console.log('user chat event dropped:', socket.id, args);
    }
}