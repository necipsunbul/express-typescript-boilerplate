export const timeZone = 'Europe/Istanbul';

export enum ApplicationMode{
    dev = 'development',
    production = 'production'
}

export enum gender {
    MALE = 1,
    FEMALE = 2,
    OTHER = 3,
}

export enum UserRole {
    USER = 1,
    ADMIN = 2,
    SUPER_ADMIN = 3,
}


export enum VercelMs{
    TWO_HOURS = '2h',
    SIX_MONTH = '180 days'
}

export class ResponseMessages{
    static  defaultSuccessMessage: string = "ok"
}