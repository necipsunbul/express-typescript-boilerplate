import { Request, Response, NextFunction } from 'express';
import FileUploadManager from '../../core/local_files/UploadManager';
import FileManager from '../../core/local_files/FileManager';
import ImageFileConstants from '../../core/contants/ImageFileContants';
import ErrorResponse from '../../core/response/ErrorResponse';
import httpStatus from 'http-status';
import { UploadedFile } from 'express-fileupload';

export default function (field: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files) return false;
      const fileCount = Array.isArray(req.files[field]) ? req.files[field].length : 1;
      const uploader = new FileUploadManager(
        req.files,
        ImageFileConstants.MimeTypes,
        ImageFileConstants.Extensions,
        FileManager.instance.getPath(['public', 'images'])
      );
      let result: Boolean = false;
      if (fileCount === 1) {
        result = await uploader.saveSingleFileToServer(field);
        if (result) req.uploadedFiles = uploader.uploadedFiles;
      } else {
        uploader.maxFileCount = fileCount;
        result = await uploader.saveAllFilesToServer(field);
        if (result) req.uploadedFiles = uploader.uploadedFiles;
      }

      if (!result) {
        const errorMessage = uploader.error.message;
        uploader.removeFiles();
        res.json(new ErrorResponse(errorMessage, httpStatus.BAD_REQUEST));
        return;
      }
      next();
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  };
}
