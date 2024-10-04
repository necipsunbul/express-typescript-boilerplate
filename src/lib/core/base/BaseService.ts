import BaseDbService from "./BaseDbService";
import AppError from "../error/AppError";
export default abstract class BaseService{
    protected abstract repo: BaseDbService;
    protected errorServiceCallback<T>(error?:AppError,data?: T){
        return new ServiceResponseEntity<T>({
            success:false,
            error: error,
            data:data,
            message: error?.message
        });
    }
    protected successServiceCallback<T>(data?:T){
        return new ServiceResponseEntity<T>({
            success:true,
            data:data
        });
    }
}

export class ServiceResponseEntity<T>{
    message?:string;
    success?:boolean;
    error? : AppError;
    data?:  T;
    constructor( body: IServiceResponseEntityBody<T> ) {

        this.message = body.message;
        this.success = body.success;
        this.data = body.data;
        this.error = body.error;
    }
}


export interface IServiceResponseEntityBody<T>{
    error? : AppError
    message?:string;
    success?:boolean;
    data?:  T;
}