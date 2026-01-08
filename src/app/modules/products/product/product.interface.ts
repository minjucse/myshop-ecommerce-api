import { IBaseDocument } from "../../../models/base.model";
import { Types } from "mongoose";

export type IProduct = Omit<IBaseDocument, "_id"> & {
  name: string;
  slug?: string;

  productSku?: string | null;
  productCode?: string | null;
  img?: string | null;
  description?: string | null;

  price: number;
  discountPrice?: number | null;
  vatRate: number;

  isNew?: boolean;
  isBestSeller?: boolean;
  badge?: string | null;

  categoryId: Types.ObjectId;
  subCategoryId: Types.ObjectId;
  brandId: Types.ObjectId;
  measurementUnitId?: Types.ObjectId | null;
};