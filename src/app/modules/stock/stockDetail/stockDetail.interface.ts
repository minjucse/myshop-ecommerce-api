import { Types } from "mongoose";
import {IBaseDocument}  from '../../../models/base.model';

export interface IStockDetail extends IBaseDocument {
  purchased: number;
  sold: number;
  freeSold: number;

//   stockInQuantity: number;
//   stockInFreeQuantity: number;

//   stockOutQuantity: number;
//   stockOutFreeQuantity: number;

  onHand: number;
  onHandFree: number;

  minimumStockToNotify: number;

  productDetailId: Types.ObjectId;
}