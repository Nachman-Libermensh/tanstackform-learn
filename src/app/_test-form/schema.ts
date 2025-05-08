import { z } from "zod";
const variationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price is required"),
  stock: z.number().min(0, "Stock is required"),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().min(1, "Barcode is required"),
});
export const testSchema = z.object({
  barkode: z.string().min(1, "Barkode is required"),
  variations: z.array(variationSchema),
  variation: z
    .object({
      name: z.string().min(1, "Name is required").optional(),
      price: z.coerce.number().min(0, "Price is required").optional(),
      stock: z.number().min(0, "Stock is required").optional(),
      sku: z.string().min(1, "SKU is required").optional(),
      barcode: z.string().min(1, "Barcode is required").optional(),
    })
    .optional(),
});
