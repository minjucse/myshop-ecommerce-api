import { IBaseDocument } from '../../../models/base.model';

export type IBrand = Omit<IBaseDocument, '_id' | 'createdAt' | 'updatedAt'> & {
  name: string;
  brandCode: string;
  address: string;
  phone: string;
  contactPersonName: string;
  country: string;
  madeInCountry: string;
  email: string;
  remarks: string;
};