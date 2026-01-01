import { z } from 'zod';

// Schema for creating a new Attribute Value
const createMeasurementUnitValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    measurementUnitSymbol: z.string().nullable().optional(),
  }),
});

// Schema for updating an existing Attribute Value
const updateMeasurementUnitValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name must be at least 1 character').optional(),
    measurementUnitSymbol: z.string().nullable().optional(),
    isDefault: z.boolean().optional(),
   
    isActive: z.boolean().optional(), // Assuming your BaseModel includes isActive
  }),
});

export const MeasurementUnitValidation = {
  createMeasurementUnitValidationSchema,
  updateMeasurementUnitValidationSchema,
};