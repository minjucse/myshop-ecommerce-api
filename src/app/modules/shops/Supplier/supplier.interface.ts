import { IBaseDocument } from '../../../models/base.model';

export type ISupplier = Omit<IBaseDocument, '_id' | 'createdAt' | 'updatedAt'> & {
  companyName: string;
  name: string;
  streetAddress: string;
  phone: string;
  country: string;
  remarks: string;
  contactPersonName: string;
  contactPersonDesignation: string;
};