export default class AppError extends Error {
    public httpStatus?: number;
    public errorCode?: number;
    constructor(message: string, codes?:IAppErrorCodes) {
        super(message);
        this.httpStatus = codes?.httpStatus;
        this.errorCode = codes?.errorCode;
    }

    get props(){
        return {
            message:this.message,
            httpStatus:this.httpStatus,
            errorCode:this.errorCode,
        }
    }
}

export interface IAppErrorCodes{
    httpStatus?: number;
    errorCode?: number;
}