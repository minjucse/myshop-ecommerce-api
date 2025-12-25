import { Types } from "mongoose";
import { IBaseDocument } from '../../../models/base.model';

export interface IStockDetailAttribute extends IBaseDocument {
    purchased: number;
    sold: number;
    onHand: number;
    minimumStockToNotify: number;

    freeSold: number;
    onHandFree: number;
    
    stockDetailId: Types.ObjectId;
    attributeValueId: Types.ObjectId;
}