import { z } from 'zod';

export const createSupplierValidationSchema = z.object({
  companyName: z
    .string()
    .nonempty("Company name is required")
    .min(2, "Company name must be at least 2 characters long."),
  name: z
    .string()
    .nonempty("Supplier name is required")
    .min(2, "Name must be at least 2 characters long."),
  streetAddress: z.string().max(200, "Street address too long.").optional().nullable(),
   phone: z
    .string()
    .regex(/^01\d{9}$/, {
      message: 'Phone number must be valid for Bangladesh. Format: 01XXXXXXXXX',
    }),
  country: z.string().min(2, "Country name must be at least 2 characters.").optional().nullable(),
  email: z
    .string()
    .email("Invalid email address format")
    .min(5, "Email must be at least 5 characters long")
    .max(100, "Email cannot exceed 100 characters")
    .optional()
    .nullable(),
  remarks: z.string().max(500, "Remarks too long.").optional().nullable(),
  contactPersonName: z.string().min(2, "Contact person name must be at least 2 characters.").optional().nullable(),
  contactPersonDesignation: z.string().max(100, "Designation too long.").optional().nullable(),
});

const updateSupplierValidationSchema = z.object({
  body: z.object({
    companyName: z
      .string()
      .min(2, 'Company name must be at least 2 characters long.')
      .optional(),
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters long.')
      .optional(),
    streetAddress: z
      .string()
      .max(200, 'Street address too long.')
      .optional()
      .nullable(),
    phone: z
      .string()
      .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format.')
      .optional(),
    country: z
      .string()
      .min(2, 'Country name must be at least 2 characters.')
      .optional()
      .nullable(),
       email: z
    .string()
    .email('Invalid email address format')
    .min(5, 'Email must be at least 5 characters long')
    .max(100, 'Email cannot exceed 100 characters'),
    remarks: z
      .string()
      .max(500, 'Remarks too long.')
      .optional()
      .nullable(),
    contactPersonName: z
      .string()
      .min(2, 'Contact person name must be at least 2 characters.')
      .optional()
      .nullable(),
    contactPersonDesignation: z
      .string()
      .max(100, 'Designation too long.')
      .optional()
      .nullable(),
  }),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export const SupplierValidation = {
  createSupplierValidationSchema,
  updateSupplierValidationSchema,
};
