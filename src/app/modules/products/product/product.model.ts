import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

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

const generateUniqueSlug = async (
  name: string,
  model: any
): Promise<string> => {
  const baseSlug = name.toLowerCase().trim().replace(/\s+/g, "-");
  let slug = baseSlug;
  let counter = 1;

  while (await model.exists({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
};

productSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    this.slug = await generateUniqueSlug(this.name, Product);
  }
  next();
});

productSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<IProduct>;

  if (update?.name) {
    update.slug = await generateUniqueSlug(update.name, Product);
    this.setUpdate(update);
  }

  next();
});

const Product = model<IProduct>("Product", productSchema);
export default Product;
