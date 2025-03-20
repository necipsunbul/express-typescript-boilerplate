import httpStatus from 'http-status';
import { Schema, model, Document } from 'mongoose';
import AuditEntity from '../entities/AuditEntity';
import AppError, { IAppErrorCodes } from '../../core/error/AppError';
import auditSchema from './AuditSchema';

export interface IUser extends Document {
  name: String;
  surName?: String;
  cover?: String;
  userName: String;
  email: String;
  password: String;
  birthDay: Date;
  gender: Number;
  roles: Array<number>;
  isDeleted: Boolean;
  isBanned: Boolean;
  audit?: AuditEntity;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    surName: String,
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
      required: true,
    },
    roles: {
      type: [Number],
      required: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    audit: auditSchema,
  },
  {
    versionKey: false,
  }
);
userSchema.post('save', { errorHandler: true }, (error: any, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const codes: IAppErrorCodes = {
      errorCode: error.code,
      httpStatus: httpStatus.BAD_REQUEST,
    };
    const error_ = new AppError('Email address is used by another user', codes);
    next(error_);
  } else {
    next(error);
  }
});
export default model<IUser>('user', userSchema);
