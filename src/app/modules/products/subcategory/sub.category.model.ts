import { Schema, model } from 'mongoose';
import { ISubCategory } from './sub.category.interface';
import { generateUniqueSlug } from '../../../utils/slugify';

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    slug: { type: String, unique: true, trim: true, default: null },
    description: { type: String, default: null },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

// Pre-save hook to generate slug
subCategorySchema.pre('save', async function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = await generateUniqueSlug(this.constructor as any, this.name);
  }
  next();
});

// Optional: pre-update hook for findOneAndUpdate
subCategorySchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as Partial<ISubCategory>;
  if (update.name) {
    update.slug = await generateUniqueSlug(this.model, update.name);
    this.setUpdate(update);
  }
  next();
});

const SubCategory = model<ISubCategory>('SubCategory', subCategorySchema);

export default SubCategory;
