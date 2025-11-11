// src/modules/banner/banner.interface.ts
import { IBaseDocument } from "../../../models/base.model";

export interface IBanner extends IBaseDocument {
  name: string;
  imgPath?: string;
  imageUrl?: string;
}
