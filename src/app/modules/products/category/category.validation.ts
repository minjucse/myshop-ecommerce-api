import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
});

const updateCategoryValidationSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character').optional(),
  isActive: z.boolean().optional(),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
