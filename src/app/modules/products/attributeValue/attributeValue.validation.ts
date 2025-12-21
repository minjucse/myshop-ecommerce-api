import { z } from 'zod';

// Schema for creating a new Attribute Value
const createAttributeValueValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    value: z.string().nullable().optional(),
    isDefault: z.boolean().optional().default(false),
   attributeGroupId: z.string().min(1, 'Attribute Group ID is required'),
  }),
});

// Schema for updating an existing Attribute Value
const updateAttributeValueValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name must be at least 1 character').optional(),
    value: z.string().nullable().optional(),
    isDefault: z.boolean().optional(),
    attributeGroupId: z.string().optional(),
    isActive: z.boolean().optional(), // Assuming your BaseModel includes isActive
  }),
});

export const AttributeValueValidation = {
  createAttributeValueValidationSchema,
  updateAttributeValueValidationSchema,
};