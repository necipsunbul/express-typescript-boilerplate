import * as socketio from "socket.io";
import * as http from "http";
import BaseSocketInterface from "../base/BaseSocket";
import ChatMessageEvent from "../../app/socket_events/ChatMessageEvent";

class SocketBuilder {
    public io: socketio.Server;
    public events: BaseSocketInterface[] = [];
    constructor(server: http.Server) {
        this.io = new socketio.Server(server, {
            cors: {
                origin: "*",
            },
        });
    }

    public build() {
        this.io
            .use(async (socket, next) => {
                await this.connectProcess(socket);
                next();
            })
            .on("connection", (socket: socketio.Socket) => {
                console.log("a user connected", socket.id);
                this.loadEvents();
                this.events.forEach((item) => item.on());

                socket.on("disconnect", () => {
                    this.events.forEach((item) => item.disconnect());
                    this.disconnectProcess(socket).then(() => null);
                });
            });
    }

    private loadEvents() {
        this.events = [
            new ChatMessageEvent(this.io)
        ]
    }

    private async connectProcess(socket?: socketio.Socket): Promise<Boolean> {
        //  cache process
        return true;
    }

    private async disconnectProcess(socket?: socketio.Socket) {
        //  unCache client process
    }
}

export default SocketBuilder;