import * as socketIo from "socket.io";
import * as http from "http";
import {SocketEventManager} from "./SocketEventManager";


class SocketBuilder {
    public io: socketIo.Server;
    private eventManager : SocketEventManager
    constructor(server: http.Server, eventManager:SocketEventManager) {
        this.io = new socketIo.Server(server, {
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
            .on("connection", (socket: socketIo.Socket) => {
                this.eventManager.handleConnection(this.io, socket);
                socket.on("disconnect",  async () => {
                    await this.disConnectProcess(socket);
                    this.eventManager.handleClosedConnection(this.io, socket);
                });

            });
    }

    private async connectProcess(socket: socketIo.Socket): Promise<void> {
        console.log("a user connected", socket.id);
    }

    private async disConnectProcess(socket: socketIo.Socket) {
        console.log("a user disconnected", socket.id);
    }
}

export default SocketBuilder;