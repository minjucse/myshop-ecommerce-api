import { Schema} from 'mongoose';
import { ISize } from './size.interface';
import { BaseModel } from '../../../models/base.model';

const sizeSchema = new Schema<ISize>({
  name: { type: String, required: true, trim: true },
},
 {
    timestamps: true,
  });

const Size = BaseModel.discriminator<ISize>("Size", sizeSchema);
export default Size;
