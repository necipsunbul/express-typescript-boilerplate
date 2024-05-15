export default class ResponseManager {
    protected message: string;
    protected success?: boolean;
    constructor(message: string) {
        this.message = message;
    }

    toJson() : Object {
        return Object.assign({},this);
    }

    setMessage(message: string) {
        this.message = message;
    }
}