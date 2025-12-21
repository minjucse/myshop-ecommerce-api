import { Schema, model, Types } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    img: { type: String, default: null },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[a-z0-9-]+$/,
    },
    description: { type: String, default: null },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: null, min: 0 },
    isNew: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    badge: { type: String, default: null, maxlength: 50 },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    brandId: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true
  }
);

productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ categoryId: 1 });
productSchema.index({ brandId: 1 });

productSchema.pre("save", async function (next) {
    if (this.isModified("name")) {
        const baseSlug = this.name.toLowerCase().split(" ").join("-")
        let slug = `${baseSlug}-division`

        let counter = 0;
        while (await Product.exists({ slug })) {
            slug = `${slug}-${counter++}` 
        }

        this.slug = slug;
    }
    next()
})

productSchema.pre("findOneAndUpdate", async function (next) {
    const division = this.getUpdate() as Partial<IProduct>

    if (division.name) {
        const baseSlug = division.name.toLowerCase().split(" ").join("-")
        let slug = `${baseSlug}-division`

        let counter = 0;
        while (await Product.exists({ slug })) {
            slug = `${slug}-${counter++}` 
        }

        division.slug = slug
    }

    this.setUpdate(division)

    next()
})

const Product = model<IProduct>('Product', productSchema);

export default Product;
