import { Schema } from 'mongoose';
import { IStockDetail } from './stockDetail.interface';
import { BaseModel } from '../../../models/base.model';

const stockDetailSchema = new Schema<IStockDetail>({
    purchased: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    freeSold: { type: Number, default: 0 },
    onHand: { type: Number, default: 0 },
    onHandFree: { type: Number, default: 0 },
    minimumStockToNotify: { type: Number, default: 0 },
    productDetailId: {
        type: Schema.Types.ObjectId,
        ref: "ProductDetail",
        required: true,
    },
},
    {
        timestamps: true,
    });

const StockDetail = BaseModel.discriminator<IStockDetail>("StockDetail", stockDetailSchema);
export default StockDetail;