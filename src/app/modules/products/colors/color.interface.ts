import { IBaseDocument } from '../../../models/base.model';

export interface IColor extends IBaseDocument {
  name: string;
  hexCode?: string;
}
