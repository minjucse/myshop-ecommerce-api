import { Schema, model } from 'mongoose';
import { IColor } from './color.interface'; 
import { BaseModel } from '../../../models/base.model';

const colorSchema = new Schema<IColor>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hexCode: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true
  }
);

const Color = BaseModel.discriminator<IColor>("Color", colorSchema);
export default Color;
