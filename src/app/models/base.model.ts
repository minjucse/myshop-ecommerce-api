import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IBaseDocument extends Document {
  _id: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the base schema
export const BaseSchema = new Schema<IBaseDocument>(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      default: null,
    },
    updatedBy: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'kind',
  }
);

