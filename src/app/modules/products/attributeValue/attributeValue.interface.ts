import { Types } from "mongoose";
import {IBaseDocument}  from '../../../models/base.model';

export interface IAttributeValue extends IBaseDocument {
  name: string;
  value?: string | null;
  isDefault: boolean;
  attributeGroupId: Types.ObjectId;
}