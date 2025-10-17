import {IBaseDocument}  from '../../../models/base.model';

export type ICategory = Omit<IBaseDocument, '_id' | 'createdAt' | 'updatedAt'> & {
    name: string;
  };