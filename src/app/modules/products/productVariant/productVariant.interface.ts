import { IBaseDocument } from "../../../models/base.model";
import { Types } from "mongoose";
import { IStockDetailAttribute } from "../../stock/stockDetailAttribute/stockDetailAttribute.interface";

export interface IProductAttribute extends IBaseDocument {
  barCode?: string;
  attributeValueId: Types.ObjectId | string;
  productDetailId: Types.ObjectId | string;
};
