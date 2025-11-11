import { z } from 'zod';

const createBrandValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  brandCode: z.string().optional(),
  address: z.string().optional(),
  phone: z
    .string()
    .regex(/^01\d{9}$/, {
      message: 'Phone number must be valid for Bangladesh. Format: 01XXXXXXXXX',
    }),
  contactPersonName: z.string().optional(),
  country: z.string().optional(),
  madeInCountry: z.string().optional(),
  email: z
    .string()
    .email('Invalid email address format')
    .min(5, 'Email must be at least 5 characters long')
    .max(100, 'Email cannot exceed 100 characters'),
  remarks: z.string().optional(),
});

const updateBrandValidationSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character').optional(),
  brandCode: z.string().optional(),
  address: z.string().optional(),
  phone: z
    .string()
    .regex(/^01\d{9}$/, {
      message: 'Phone number must be valid for Bangladesh. Format: 01XXXXXXXXX',
    })
    .optional(),
  contactPersonName: z.string().optional(),
  country: z.string().optional(),
  madeInCountry: z.string().optional(),
  email: z
    .string()
    .email('Invalid email address format')
    .min(5, 'Email must be at least 5 characters long')
    .max(100, 'Email cannot exceed 100 characters')
    .optional(),
  remarks: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export const BrandValidation = {
  createBrandValidationSchema,
  updateBrandValidationSchema,
};
