import { UploadedFile } from "express-fileupload";
import { Server,Socket } from "socket.io";
declare global {
    namespace Express {
        export interface Request {
            event?: Server;
            fileError: string;
            uploadedFile?: UploadedFile;
            uploadedFiles?: UploadedFile[];
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            PORT: Number;
        }
    }
}

export interface IRPCPublisher {
    requestRPC: <T extends Object>(data: T) => Promise<unknown>;
}

export interface ISocketEvent {
    name: string;
    handle(io: Server, socket: Socket, ...args: any[]): void;
}