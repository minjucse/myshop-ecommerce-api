import { z } from 'zod';

const createColorValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  hexCode: z.string().optional(),
});

const updateColorValidationSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character').optional(),
  hexCode: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const colorValidation = {
  createColorValidationSchema,
  updateColorValidationSchema,
};
