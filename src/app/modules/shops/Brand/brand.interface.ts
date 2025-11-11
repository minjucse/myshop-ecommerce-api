import { IBaseDocument } from '../../../models/base.model';

export interface IBrand extends IBaseDocument {
  name: string;
  brandCode: string;
  address: string;
  phone: string;
  contactPersonName: string;
  country: string;
  madeInCountry: string;
  email: string;
  remarks: string;
}

