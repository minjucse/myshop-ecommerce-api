import { Schema, model } from "mongoose";
import { IProductAttribute } from "./productVariant.interface";

const productAttributeSchema = new Schema<IProductAttribute>(
  {
    barCode: {
      type: String,
      trim: true,
      maxlength: 100,
      default: null,
    },

    attributeValueId: {
      type: Schema.Types.ObjectId,
      ref: "AttributeValue",
      default: null,
    },

    productDetailId: {
      type: Schema.Types.ObjectId,
      ref: "ProductDetail",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
productAttributeSchema.index({ barCode: 1 });
productAttributeSchema.index({ attributeValueId: 1 });
productAttributeSchema.index({ productDetailId: 1 });

const ProductAttribute = model<IProductAttribute>(
  "ProductAttribute",
  productAttributeSchema
);

export default ProductAttribute;
