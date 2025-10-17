import { Schema, model, Query, Document } from 'mongoose';
import { BaseSchema } from '../../../models/base.model';
import { ICategory } from './category.interface'; // your existing interface

// Extend your interface to include Mongoose Document
export type CategoryDocument = ICategory & Document;

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'ProductCategories',
  }
);

// Add base fields like isActive, isDeleted
CategorySchema.add(BaseSchema);

// Pre-query hook to exclude deleted documents by default
CategorySchema.pre<Query<any, CategoryDocument>>(/^find/, function (next) {
  if (!(this as any).getQuery().includeDeleted) {
    this.where({ isDeleted: false });
  }
  next();
});

// Create Mongoose model
const Category = model<CategoryDocument>('ProductCategory', CategorySchema);

export default Category;
