import bcrypt from "bcrypt";
import crypto from "crypto-js";

export default class Hashing {
    private _instance?:Hashing;
    private constructor() {}
    public get instance() : Hashing {
        if(!this._instance) this._instance = new Hashing();
        return this._instance;
    }
    SHA256(payload: string) {
        return crypto.SHA256(payload).toString(crypto.enc.Hex);
    }

    SHA1(payload: string) {
        return crypto.SHA1(payload).toString(crypto.enc.Hex);
    }

    randomString(size: number = 16) {
        return crypto.lib.WordArray.random(size).toString();
    }

    bcryptHash(payload: string) {
        return bcrypt.hash(payload, 10);
    }

    bcryptCompare(payload: string, hash: string) {
        return bcrypt.compare(payload, hash);
    }

    encryptData(payload: string) {
        return crypto.AES.encrypt(
            payload,
            process.env.AES_SECRET_KEY as string
        ).toString();
    }

    static decryptData(ciphertext: string) {
        const bytes = crypto.AES.decrypt(
            ciphertext,
            process.env.AES_SECRET_KEY as string
        );
        return bytes.toString(crypto.enc.Utf8);
    }
}