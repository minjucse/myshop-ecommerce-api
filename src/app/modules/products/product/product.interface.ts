import { IBaseDocument } from '../../../models/base.model';
import { Types } from 'mongoose';
import { IProductAttribute } from '../productVariant/productVariant.interface';
import { IStockDetail } from '../../stock/stockDetail/stockDetail.interface';


export type IProduct = Omit<IBaseDocument, '_id' | 'createdAt' | 'updatedAt'> & {
  name: string;
  img?: string;
  slug: string;
  description?: string | null;
  price: number;
  discountPrice?: number | null;

  vatRate?: number;
  startingInventory?: number;
  minimumStockToNotify?: number;

  isNew?: boolean;
  isBestSeller?: boolean;
  badge?: string | null;

  categoryId: Types.ObjectId;
  subCategoryId?: Types.ObjectId;
  brandId: Types.ObjectId;

  measurementUnitId?: Types.ObjectId;

  productAttributes?: IProductAttribute[];

  stockDetail?: IStockDetail;
};


type PopulatedField = {
  _id: Types.ObjectId;
  name: string;
};

export type IProductPopulated =
  Omit<IProduct,
    | "brandId"
    | "categoryId"
    | "subCategoryId"
    | "measurementUnitId"
  > & {
    brandId?: PopulatedField;
    categoryId?: PopulatedField;
    subCategoryId?: PopulatedField;
    measurementUnitId?: PopulatedField;
  };
