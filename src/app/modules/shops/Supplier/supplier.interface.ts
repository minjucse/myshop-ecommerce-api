import { IBaseDocument } from '../../../models/base.model';

export interface ISupplier extends IBaseDocument {
  companyName: string;
  name: string;
  streetAddress: string;
  phone: string;
  country: string;
   email: string;
  remarks: string;
  contactPersonName: string;
  contactPersonDesignation: string;
}

