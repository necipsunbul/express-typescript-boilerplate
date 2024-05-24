import { Socket, Server } from "socket.io";
import BaseSocketInterface from "../../core/base/BaseSocket";

export enum ChatMessageType {
    EVENT_NAME = "message",
}

class SendChatMessageEvent extends BaseSocketInterface {
     io: Server;
    eventName: ChatMessageType = ChatMessageType.EVENT_NAME;
    constructor( io: Server) {
        super();
        this.io = io;
    }

    public on(): void {
        this.io.on(this.eventName, (message) => {
            console.log(this.eventName, message);
        });
    }

    public disconnect(): void {
        // user chat event disconnet processs
        console.log("message event disconnect");
    }
}

export default SendChatMessageEvent;