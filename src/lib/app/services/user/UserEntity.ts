import AuditEntityModel from "../../entities/AuditEntity";

export class UserEntity {
    name?: string;
    surName?: string;
    email?: string;
    userName?: string;
    password?: string;
    audit?: AuditEntityModel;
    roles?: number[];
}