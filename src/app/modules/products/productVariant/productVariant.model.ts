// productVariant.model.ts
import { Schema, model } from "mongoose";
import { IProductAttribute } from "./productVariant.interface";

const productAttributeSchema = new Schema<IProductAttribute>(
  {
    attributeValueId: {
      type: Schema.Types.ObjectId,
      ref: "AttributeValue",
      required: true,
      index: true,
    },

    productDetailId: {
      type: Schema.Types.ObjectId,
      ref: "ProductDetail",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

productAttributeSchema.index(
  { productDetailId: 1, attributeValueId: 1 },
  { unique: true }
);

export default model<IProductAttribute>(
  "ProductAttribute",
  productAttributeSchema
);
