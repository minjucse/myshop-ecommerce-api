import { z } from 'zod';

export const createProductZodSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }).max(100, { message: 'Name must not exceed 100 characters' }),
  img: z.string().nullable().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/, { message: 'Slug must contain only lowercase letters, numbers, and hyphens' }).optional(),
  description: z.string().nullable().optional(),
  price: z.number().min(0, { message: 'Price cannot be negative' }),
  vatRate:z.number().min(0, { message: 'Vat Rate cannot be negative' }),
  startingInventory:z.number().min(0, { message: 'Starting Inventory cannot be negative' }),
  minimumStockToNotify:z.number().min(0, { message: 'Stock Notify cannot be negative' }),
  discountPrice: z.number().min(0, { message: 'Discount cannot be negative' }).nullable().optional(),
  isNew: z.boolean().optional().default(false),
  isBestSeller: z.boolean().optional().default(false),
  badge: z.string().nullable().optional(),
  categoryId: z.string().min(1, { message: 'Category ID is required' }),
  subCategoryId: z.string().min(1, { message: 'Sub Category ID is required' }),
  brandId: z.string().min(1, { message: 'Brand ID is required' }),
  measurementUnitId: z.string().optional(),
  isActive: z.boolean().optional().default(true),
  isDeleted: z.boolean().optional().default(false),
});

export const updateProductZodSchema = createProductZodSchema.partial();
