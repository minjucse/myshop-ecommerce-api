import { z } from 'zod';

const variantAttributeSchema = z.object({
  attributeValueId: z.string().min(1),
});

const productVariantSchema = z.object({
  barCode: z.string().optional(),
  startingInventory: z.number().min(0),
  minimumStockToNotify: z.number().min(0),
  attributes: z.array(variantAttributeSchema).min(1),
});

export const createProductZodSchema = z.object({
  name: z.string().min(1),
  productSku: z.string().optional(),
  productCode: z.string().optional(),
  price: z.number().min(0),
  vatRate: z.number().min(0),

  categoryId: z.string(),
  subCategoryId: z.string(),
  brandId: z.string(),
  measurementUnitId: z.string().optional(),

  isNew: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),

  productAttributes: z.array(productVariantSchema),
});

export const updateProductZodSchema = createProductZodSchema.partial();

export const ProductValidation = {
  createProductValidationSchema: createProductZodSchema,
  updateProductValidationSchema: updateProductZodSchema,
};