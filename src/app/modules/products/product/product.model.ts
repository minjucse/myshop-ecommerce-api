// product.model.ts
import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";
import { generateUniqueSlug } from "../../../utils/slugify";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      match: /^[a-z0-9-]+$/,
    },

    productSku: { type: String, default: null },
    productCode: { type: String, default: null },
    img: { type: String, default: null },
    description: { type: String, default: null },

    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: null, min: 0 },
    vatRate: { type: Number, default: 0, min: 0 },

    isNew: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    badge: { type: String, default: null },

    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategoryId: { type: Schema.Types.ObjectId, ref: "SubCategory", required: true },
    brandId: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    measurementUnitId: { type: Schema.Types.ObjectId, ref: "MeasurementUnit", default: null },
  },
  { timestamps: true }
);

productSchema.pre("save", async function (next) {
  if (!this.slug) {
    this.slug = await generateUniqueSlug(this.constructor as any, this.name);
  }
  next();
});

export default model<IProduct>("Product", productSchema);
