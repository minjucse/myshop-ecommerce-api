import { IBaseDocument } from '../../../models/base.model';

export type IShop = Omit<IBaseDocument, "_id" | "createdAt" | "updatedAt"> & {
  name: string;
  phone: string;
  streetAddress: string;
  contactPersonName: string;
  contactPersonPhone: string;
  website?: string;
  email: string;
  facebook?: string;
  accountNumber?: string;
  remarks?: string;
  registrationDate: Date;
  expiryDate: Date;
  logoUrl?: string;
};
