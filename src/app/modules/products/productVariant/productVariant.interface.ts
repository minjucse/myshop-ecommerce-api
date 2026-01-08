import { IBaseDocument } from "../../../models/base.model";
import { Types } from "mongoose";

export interface IProductAttribute extends IBaseDocument {
  attributeValueId: Types.ObjectId | string;
  productDetailId: Types.ObjectId | string;
};
