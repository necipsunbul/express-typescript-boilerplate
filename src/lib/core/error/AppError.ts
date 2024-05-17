export default class AppError extends Error {
    public httpStatus?: number;
    public errorCode?: number;
    constructor(message: string, codes?:IAppErrorCodes) {
        super(message);
        this.httpStatus = codes?.httpStatus;
        this.errorCode = codes?.errorCode;
    }
}

export interface IAppErrorCodes{
    httpStatus?: number;
    errorCode?: number;
}