import { Schema, model, Document, Query } from 'mongoose';
import { BaseSchema } from '../../../models/base.model';
import { IShop } from './shop.interface';

const ShopSchema = new Schema<IShop>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    streetAddress: { type: String, required: true, trim: true },
    contactPersonName: { type: String, required: true, trim: true },
    contactPersonPhone: { type: String, required: true, trim: true },
    website: { type: String, default: null, trim: true },
    email: { type: String, required: true, trim: true },
    facebook: { type: String, default: null, trim: true },
    accountNumber: { type: String, default: null, trim: true },
    remarks: { type: String, default: null, trim: true },
    registrationDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    logoUrl: { type: String, default: null },
  },
  {
    timestamps: true,
    collection: 'Shops',
  }
);

// Add BaseSchema fields (isActive, isDeleted, createdBy, updatedBy)
ShopSchema.add(BaseSchema);

// Pre-query hook to ignore soft-deleted documents
ShopSchema.pre<Query<any, IShop>>(/^find/, function (next) {
  if (!(this as any).getQuery().includeDeleted) {
    this.where({ isDeleted: false });
  }
  next();
});

const Shop = model<IShop>('Shop', ShopSchema);

export default Shop;
