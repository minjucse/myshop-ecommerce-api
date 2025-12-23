import { IBaseDocument } from '../../../models/base.model';
import { Types } from 'mongoose';
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

    categoryId: Types.ObjectId | string;
    subCategoryId?: Types.ObjectId | string;
    brandId: Types.ObjectId | string;

    measurementUnitId?: Types.ObjectId | string;
};