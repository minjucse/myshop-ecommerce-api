import { Schema, model } from 'mongoose';
import { IBrand } from './brand.interface';

const brandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, trim: true },
    brandCode: { type: String, default: null },
    address: { type: String, default: null },
    phone: { type: String, required: true },
    contactPersonName: { type: String, default: null },
    country: { type: String, default: null },
    madeInCountry: { type: String, default: null },
    email: { type: String, required: true },
    remarks: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Brand = model<IBrand>('Brand', brandSchema);

export default Brand;
