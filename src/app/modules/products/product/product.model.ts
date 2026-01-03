import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";
import { generateUniqueSlug } from "../../../utils/slugify"

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9-]+$/,
    },
    productSku: {
      type: String,
      default: null,
    },
    productCode: {
      type: String,
      default: null,
    },
    img: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      default: null,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: null,
      min: 0,
    },

    vatRate: {
      type: Number,
      default: 0,
      min: 0,
    },

    startingInventory: {
      type: Number,
      default: 0,
      min: 0,
    },

    minimumStockToNotify: {
      type: Number,
      default: 0,
      min: 0,
    },

    isNew: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    badge: {
      type: String,
      default: null,
      maxlength: 50,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    measurementUnitId: {
      type: Schema.Types.ObjectId,
      ref: "MeasurementUnit",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ categoryId: 1 });
productSchema.index({ brandId: 1 });


productSchema.pre("save", async function (next) {
  if (!this.slug) {
    this.slug = await generateUniqueSlug(
      this.constructor as any,
      this.name
    );
  }
  next();
});

productSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as any;

  if (update?.name) {
    update.slug = await generateUniqueSlug(
      this.model,
      update.name
    );
    this.setUpdate(update);
  }

  next();
});
const ProductDetail = model<IProduct>("ProductDetail", productSchema);
export default ProductDetail;
