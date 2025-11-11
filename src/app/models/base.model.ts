// src/models/base.model.ts
import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IBaseDocument extends Document {
  id: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export const BaseSchema = new Schema<IBaseDocument>(
  {
    id: {
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
    discriminatorKey: "kind",
  }
);

// Create BaseModel
export const BaseModel = model<IBaseDocument>("Base", BaseSchema);
