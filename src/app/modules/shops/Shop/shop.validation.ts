import { z } from "zod";

// Optional URL helper
const optionalUrl = z
  .string()
  .trim()
  .transform((val) => (val === "" ? undefined : val))
  .optional()
  .refine((val) => !val || /^https?:\/\/.+/.test(val), {
    message: "Must be a valid URL",
  });

// Optional string helper
const optionalString = z
  .string()
  .trim()
  .transform((val) => (val === "" ? undefined : val))
  .optional();

// Optional File or URL
const optionalFileOrUrl = z.union([z.instanceof(File), optionalUrl]).optional();

// Create schema
export const createShopValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phone: z.string().nonempty("Phone is required"),
  streetAddress: optionalString,
  contactPersonName: optionalString,
  contactPersonPhone: optionalString,
  website: optionalUrl,
  email: z.string().email("Email must be valid").nonempty("Email is required"),
  facebook: optionalUrl,
  accountNumber: optionalString,
  remarks: optionalString,
  registrationDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional()
  ),
  expiryDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional()
  ),
  logoUrl: optionalFileOrUrl,
});

// Update schema (all optional)
export const updateShopValidationSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  streetAddress: optionalString,
  contactPersonName: optionalString,
  contactPersonPhone: optionalString,
  website: optionalUrl,
  email: z.string().email("Email must be valid").optional(),
  facebook: optionalUrl,
  accountNumber: optionalString,
  remarks: optionalString,
  registrationDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional()
  ),
  expiryDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional()
  ),
  logoUrl: optionalFileOrUrl,
});

export const ShopValidation = {
  createShopValidationSchema,
  updateShopValidationSchema,
};
