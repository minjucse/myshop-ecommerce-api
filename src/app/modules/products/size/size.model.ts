import { Schema, model } from 'mongoose';
import { ISize } from './size.interface';

const sizeSchema = new Schema<ISize>(
  {
    name: { type: String, required: true, trim: true }
  },
  { timestamps: true } 
);

const Size = model<ISize>('Size', sizeSchema);

export default Size;
