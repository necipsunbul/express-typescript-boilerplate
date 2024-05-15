import { UploadedFile } from "express-fileupload";
import { Server } from "socket.io";
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