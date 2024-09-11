import * as socketio from "socket.io";
import * as http from "http";
import {SocketEventManager} from "./SocketEventManager";


class SocketBuilder {
    public io: socketio.Server;
    private eventManager : SocketEventManager
    constructor(server: http.Server, eventManager:SocketEventManager) {
        this.io = new socketio.Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            },
        });
        this.eventManager = eventManager;
    }

    public build() {
        this.io
            .use(async (socket, next) => {
                await this.connectProcess(socket);
                next();
            })
            .on("connection", (socket: socketio.Socket) => {
                this.eventManager.handleConnection(this.io, socket);
                socket.on("disconnect",  async () => {
                    await this.disConnectProcess(socket)
                });

            });
    }

    private async connectProcess(socket: socketio.Socket): Promise<void> {
        console.log("a user connected", socket.id);
    }

    private async disConnectProcess(socket: socketio.Socket) {
        console.log("a user disconnected", socket.id);
    }
}

export default SocketBuilder;