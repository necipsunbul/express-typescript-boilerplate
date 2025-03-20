import { Schema } from 'mongoose';

const auditSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: Schema.Types.ObjectId,
    updatedAt: Date,
    updatedBy: Schema.Types.ObjectId,
  },
  {
    versionKey: false,
    _id: false,
  }
);

export default auditSchema;
