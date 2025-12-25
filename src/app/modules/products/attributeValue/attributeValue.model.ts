// src/models/attributeValue.model.ts
import { Schema } from "mongoose";
import { BaseModel } from '../../../models/base.model';
import { IAttributeValue } from "./attributeValue.interface";

const attributeValueSchema = new Schema<IAttributeValue>({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  value: {
    type: String,
    default: null,
  },

  isDefault: {
    type: Boolean,
    default: false,
  },

  attributeGroupId: {
    type: Schema.Types.ObjectId,
    ref: "AttributeGroup",
    required: true,
    index: true,
  },
});

 const AttributeValue = BaseModel.discriminator<IAttributeValue>( "AttributeValue", attributeValueSchema );
 export default AttributeValue;
