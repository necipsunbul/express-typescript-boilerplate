export interface IAuditEntityBody{
    createdAt?: Date;
    createdBy?: String;
    updatedAt?: Date;
    updatedBy?: String;
}

export default class AuditEntity{
    createdAt?: Date;
    createdBy?: String;
    updatedAt?: Date;
    updatedBy?: String;
    constructor(body:IAuditEntityBody) {
        this.createdAt = body.createdAt;
        this.createdBy = body.createdBy;
        this.updatedAt = body.updatedAt;
        this.updatedBy = body.updatedBy;
    }
}