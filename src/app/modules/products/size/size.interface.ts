import {IBaseDocument}  from '../../../models/base.model';

export type ISize = Omit<IBaseDocument, '_id' | 'createdAt' | 'updatedAt'> & {
    name: string;
  };