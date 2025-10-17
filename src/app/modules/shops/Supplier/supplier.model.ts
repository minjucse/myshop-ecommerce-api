import { Schema, model, Query } from 'mongoose';
import { BaseSchema } from '../../../models/base.model';
import { ISupplier } from './supplier.interface';

const SupplierSchema = new Schema<ISupplier>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    streetAddress: {
      type: String,
      default: null,
      trim: true,
    },
    phone: {
      type: String,
      default: null,
      trim: true,
    },
    country: {
      type: String,
      default: null,
      trim: true,
    },
    remarks: {
      type: String,
      default: null,
      trim: true,
    },
    contactPersonName: {
      type: String,
      default: null,
      trim: true,
    },
    contactPersonDesignation: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'Suppliers',
  }
);

// ✅ Extend with your BaseSchema (adds isActive, isDeleted, etc.)
SupplierSchema.add(BaseSchema);

// ✅ Type-safe pre-query hook (acts like Sequelize `paranoid: true`)
SupplierSchema.pre<Query<any, ISupplier>>(/^find/, function (next) {
  if (!(this as any).getQuery().includeDeleted) {
    this.where({ isDeleted: false });
  }
  next();
});

// ✅ Create the Mongoose Model
const Supplier = model<ISupplier>('Supplier', SupplierSchema);

export default Supplier;
