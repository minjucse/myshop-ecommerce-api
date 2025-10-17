import { z } from 'zod';

const createBannerValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  imgPath: z.string().optional(),
  imageUrl: z.string().optional(),
});

const updateBannerValidationSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character').optional(),
  imgPath: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const BannerValidation = {
  createBannerValidationSchema,
  updateBannerValidationSchema,
};
