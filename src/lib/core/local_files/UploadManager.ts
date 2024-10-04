import { UploadedFile, FileArray } from "express-fileupload";
import FileManager from "./FileManager";

class FileUploadManager {
    private readonly files: FileArray;
    private singleFileName?: string;
    private readonly filePath: string;
    private allowedExtensions: string[] = [];
    private allowedMimeTypes: string[] = [];
    public error = { message: "", errorCode: 0 };
    public uploadedFiles: UploadedFile[] = [];
    public uploadedFile?: UploadedFile;
    public maxFileCount: number = 1;
    constructor(
        files: FileArray,
        allowedMimeTypes: string[],
        allowedExtensions: string[],
        filePath: string
    ) {
        this.files = files;
        this.allowedMimeTypes = allowedMimeTypes;
        this.allowedExtensions = allowedExtensions;
        this.filePath = filePath;
    }

    private isSingleFile(
        file: UploadedFile | UploadedFile[]
    ): file is UploadedFile {
        this.setErrorMessage("File has been not provided");
        return (
            typeof file === "object" && (file as UploadedFile).name !== undefined
        );
    }

    private setErrorMessage(message: string, errorCode: number = 0): void {
        this.error = {
            message,
            errorCode,
        };
    }

    private checkMimeType(file: UploadedFile): Boolean {
        const result = this.allowedMimeTypes.includes(file.mimetype);
        if (!result) this.setErrorMessage("File Not Allowed");
        return result;
    }

    private checkExtension(file: UploadedFile): Boolean {
        const ext = FileManager.instance.getFileExtension(file.name);
        const result = this.allowedExtensions.includes(ext);
        if (!result) this.setErrorMessage("File Not Allowed");
        return result;
    }

    private checkFileCount(): Boolean {
        if (Array.isArray(this.files) && this.files.length > this.maxFileCount) {
            this.setErrorMessage("File Limit Exceeded");
            return false;
        }
        return true;
    }

    private removeFiles(): void {
        this.uploadedFiles.forEach((item) => {
            FileManager.instance.removeFileFromServer(
                FileManager.instance.getPath([this.filePath, item.name])
            );
            FileManager.instance.removeFileFromServer(
                FileManager.instance.joinPath([item.tempFilePath, item.name])
            );
        });
    }

    private setFileName(fileName: string, regenerate: Boolean = true) {
        this.singleFileName = regenerate
            ? Date.now().toString() + fileName
            : fileName;
    }

    public async saveAllFilesToServer(field: string): Promise<Boolean> {
        try {
            const files: UploadedFile | UploadedFile[] = this.files[field];
            if (!Array.isArray(files)) return false;
            if (!this.checkFileCount()) return false;
            for (const file of files) {
                if (!this.checkExtension(file) || !this.checkMimeType(file)) {
                    this.removeFiles();
                    return false;
                }
                this.setFileName(file.name);
                await this.moveFile(file);
                this.uploadedFiles.push(file);
            }
            return true;
        } catch {
            this.setErrorMessage("File Upload Crashed");
            return false;
        }
    }

    public async saveSingleFileToServer(field: string): Promise<Boolean> {
        try {
            const file: UploadedFile | UploadedFile[] = this.files[field];
            if (!this.isSingleFile(file)) return false;
            if (!this.checkExtension(file) || !this.checkMimeType(file)) return false;
            this.setFileName(file.name);
            await this.moveFile(file);
            file.name = this.singleFileName!;
            this.uploadedFile = file;
            return true;
        } catch {
            this.setErrorMessage("File Upload Crashed");
            return false;
        }
    }

    private moveFile(file: UploadedFile) {
        if (!this.singleFileName) return Promise.reject("Filename is empty");
        const path = this.filePath + "/" + this.singleFileName;
        return new Promise((resolve, reject) => {
            file.mv(path, function (err) {
                if (err) reject(err);
                resolve(true);
            });
        });
    }
}

export default FileUploadManager;