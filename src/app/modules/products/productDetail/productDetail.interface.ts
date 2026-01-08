import { IBaseDocument } from "../../../models/base.model";
import { Types } from "mongoose";

export interface IProductDetail extends IBaseDocument {
  productId: Types.ObjectId;
  barCode?: string;
  startingInventory: number;
  minimumStockToNotify: number;
}
