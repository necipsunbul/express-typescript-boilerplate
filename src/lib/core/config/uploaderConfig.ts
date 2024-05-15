const FileUploadConfig = {
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
    //safeFileNames:true
};

export default FileUploadConfig;