import { Schema } from 'mongoose';
import { IStockDetailAttribute } from './stockDetailAttribute.interface';
import { BaseModel } from '../../../models/base.model';

const stockDetailAttributeSchema = new Schema<IStockDetailAttribute>(
  {
    purchased: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    onHand: { type: Number, default: 0 },
    freeSold: { type: Number, default: 0 },
    onHandFree: { type: Number, default: 0 },
    minimumStockToNotify: { type: Number, default: 0 },

    stockDetailId: {
      type: Schema.Types.ObjectId,
      ref: "StockDetail",
      required: true,
    },

    attributeValueId: {
      type: Schema.Types.ObjectId,
      ref: "AttributeValue",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StockDetailAttribute = BaseModel.discriminator<IStockDetailAttribute>("StockDetailAttribute", stockDetailAttributeSchema);
export default StockDetailAttribute;