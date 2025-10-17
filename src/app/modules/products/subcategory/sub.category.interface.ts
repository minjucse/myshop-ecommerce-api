import { IBaseDocument } from '../../../models/base.model';
import { Types } from 'mongoose';

export type ISubCategory = Omit<IBaseDocument, 'id' | 'createdAt' | 'updatedAt'> & {
    name: string;
    slug: string;
    description?: string | null;  
     categoryId: Types.ObjectId;
};