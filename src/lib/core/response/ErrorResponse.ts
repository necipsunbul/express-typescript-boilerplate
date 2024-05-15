import ResponseManager from "./ResponseManager";

export default class ErrorResponse extends ResponseManager {
    errorCode?: number;
    httpStatus?: number;
    constructor(message: string, httpStatus?: number) {
        super(message);
        this.success = false;
        this.httpStatus = httpStatus;
    }
}