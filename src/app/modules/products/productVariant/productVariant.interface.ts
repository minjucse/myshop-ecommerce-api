import { IBaseDocument } from "../../../models/base.model";
import { Types } from "mongoose";

export type IProductAttribute = Omit<
  IBaseDocument,
  "_id" | "createdAt" | "updatedAt"
> & {
  barCode?: string;
  attributeValueId: Types.ObjectId | string;
  productDetailId: Types.ObjectId | string;
};
