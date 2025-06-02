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
            PORT: number;
            AES_SECRET_KEY: string;
            RSA_KEY: string;


            MONGO_USERNAME:string;
            MONGO_PASSWORD:string;
            MONGO_DATABASE: string;
            MONGO_HOST: string;
            MONGO_PORT: number;


            REDIS_PORT: number;
            REDIS_USERNAME: string
            REDIS_PASSWORD:string;
            REDIS_SERVER:string;
            POSTGRES_USER:string;

            POSTGRES_PASSWORD:string;
            POSTGRES_DB:string;
            POSTGRES_HOST:string;
            POSTGRES_PORT:number;

            RABBITMQ_USER:string;
            RABBITMQ_PASSWORD:string;
            RABBITMQ_HOST:string;
            RABBITMQ_PORT:number;
            RABBITMQ_PREFIX:string;
    
            MQTT_PORT: number;
            MQTT_HOST: string;
            MQTT_USER: string;
            MQTT_PASSWORD: string;

        }
    }
}

export interface IRPCPublisher {
    requestRPC: <T extends Object>(data: T) => Promise<unknown>;
}

export interface ISocketEvent {
    name: string;
    handle(io: Server, socket: Socket, ...args: any[]): void;
    handleClosed(io: Server, socket: Socket, ...args: any[]): void;
}

