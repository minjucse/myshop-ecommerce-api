import { z } from 'zod';

const createAttributeValueValidationSchema = z.object({
    name: z.string().nonempty('Name is required'),
    value: z.string().optional().nullable(),
   attributeGroupId: z.string().min(1, 'Attribute Group ID is required'),
});

const updateAttributeValueValidationSchema = z.object({
   name: z.string().min(1, 'Name must be at least 1 character').optional(),
   value: z.string().optional().nullable(),
    attributeGroupId: z.string().optional(),
    isActive: z.boolean().optional(), 
});

export const AttributeValueValidation = {
  createAttributeValueValidationSchema,
  updateAttributeValueValidationSchema,
};