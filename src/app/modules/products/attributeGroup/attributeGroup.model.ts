import { Schema} from 'mongoose';
import { IAttributeGroup} from './attributeGroup.interface';
import { BaseModel } from '../../../models/base.model';

const attributeGroupSchema = new Schema<IAttributeGroup>({
  name: { type: String, required: true, trim: true },
},
 {
    timestamps: true,
  });

const AttributeGroup = BaseModel.discriminator<IAttributeGroup>("AttributeGroup", attributeGroupSchema);
export default AttributeGroup;
