import {IBaseDocument}  from '../../../models/base.model';

export type IBanner = Omit<IBaseDocument, '_id' | 'createdAt' | 'updatedAt'> & {
    name: string;
    imgPath?: string;
    imageUrl?: string;
  };