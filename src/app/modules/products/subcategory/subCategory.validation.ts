import { z } from 'zod';

const createSubCategoryValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  slug: z.string().optional(),
  description: z.string().nullable().optional(),
  categoryId: z.string().optional(),
});

const updateSubCategoryValidationSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character').optional(),
  slug: z.string().optional(),
  description: z.string().nullable().optional(),
  categoryId: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const SubCategoryValidation = {
  createSubCategoryValidationSchema,
  updateSubCategoryValidationSchema,
};
