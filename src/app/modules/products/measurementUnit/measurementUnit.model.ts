// src/models/attributeValue.model.ts
import { Schema } from "mongoose";
import { BaseModel } from '../../../models/base.model';
import { IMeasurementUnit } from "./measurementUnit.interface";

const measurementUnitSchema = new Schema<IMeasurementUnit>({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    measurementUnitSymbol: {
        type: String,
        default: null,
    },

});

 const MeasurementUnit = BaseModel.discriminator<IMeasurementUnit>(
    "MeasurementUnit",
    measurementUnitSchema
);
export default MeasurementUnit;
