import { Request, Response, NextFunction } from "express";
import FileUploadManager from "../../core/local_files/UploadManager";
import FileManager from "../../core/local_files/FileManager";
import ImageFileConstants from "../../core/contants/ImageFileContants";
import ErrorResponse from "../../core/response/ErrorResponse";
import httpStatus from "http-status";

export default function(field: string, fileCount: number = 1){
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.files) return false;
            const uploader = new FileUploadManager(
                req.files,
                ImageFileConstants.MimeTypes,
                ImageFileConstants.Extensions,
                FileManager.instance.getPath(["public", "images"])
            );
            let result: Boolean = false;
            if (fileCount === 1) {
                result = await uploader.saveSingleFileToServer(field);
                if (result) req.uploadedFile = uploader.uploadedFile;
            } else {
                uploader.maxFileCount = fileCount;
                result = await uploader.saveAllFilesToServer(field);
                if (result) req.uploadedFiles = uploader.uploadedFiles;
            }
            if (!result)
                return res.json(
                    new ErrorResponse(uploader.error.message, httpStatus.BAD_REQUEST)
                );
            next();
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
        }
    }
}