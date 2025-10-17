import {IBaseDocument}  from '../../../models/base.model';

export type IColor = Omit<IBaseDocument, '_id' | 'createdAt' | 'updatedAt'> & {
    name: string;
    hexCode?: string;
  };