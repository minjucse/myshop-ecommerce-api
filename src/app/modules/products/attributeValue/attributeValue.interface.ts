import { Types } from "mongoose";
import {IBaseDocument}  from '../../../models/base.model';
import { IAttributeGroup } from "../attributeGroup/attributeGroup.interface";

export interface IAttributeValue extends IBaseDocument {
  name: string;
  value?: string | null;
  isDefault: boolean;
  attributeGroupId: Types.ObjectId;

  attributeGroup?: IAttributeGroup[];
}