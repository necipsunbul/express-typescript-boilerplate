import BaseDbService from "./BaseDbService";
import BaseEntityModel from "./BaseEntityModel";

export default abstract class BaseService{
    protected abstract repo: BaseDbService;
    protected errorServiceCallback<T>(message?:string,data?: T){
        return new ServiceResponseEntity<T>({
            success:false,
            message: message,
            data:data
        });
    }
    protected successServiceCallback<T>(data?:T){
        return new ServiceResponseEntity<T>({
            success:true,
            data:data
        });
    }
}

export class ServiceResponseEntity<T> extends BaseEntityModel{
    message?:string;
    success?:boolean;
    data?:  T;
    constructor( body: IServiceResponseEntityBody<T> ) {
        super();
        this.message = body.message;
        this.success = body.success;
        this.data = body.data;
    }
}
export interface IServiceResponseEntityBody<T>{
    message?:string;
    success?:boolean;
    data?:  T;
}