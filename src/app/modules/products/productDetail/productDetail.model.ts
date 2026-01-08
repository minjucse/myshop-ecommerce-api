// productDetail.model.ts
import { Schema, model } from "mongoose";
import { IProductDetail } from "./productDetail.interface";

const productDetailSchema = new Schema<IProductDetail>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    barCode: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    startingInventory: {
      type: Number,
      required: true,
      min: 0,
    },

    minimumStockToNotify: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export default model<IProductDetail>("ProductDetail", productDetailSchema);
