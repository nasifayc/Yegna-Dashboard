import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().nonempty("Product name is required").trim(),
  description: z.string().trim().optional(),
  price: z.number().min(0, "Price must be a number greater than or equal to 0"),
  stock: z
    .number()
    .int()
    .min(0, "Stock must be an integer greater than or equal to 0"),
  category: z
    .string()
    .nonempty("Category is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Category must be a valid MongoDB ObjectId"),
  brand: z.string().trim().optional(),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isTrending: z.boolean().optional(),

  discount: z
    .number()
    .min(0, "Discount must be at least 0")
    .max(100, "Discount must not exceed 100")
    .optional(),
  sku: z.string().trim().optional(),
  images: z.any(),
});

export type ProductSchemaData = z.infer<typeof productSchema>;

const useCreateProductForm = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   setError,
  //   reset,
  //   formState: { errors },
  // } = useForm<ProductSchemaData>({
  //   resolver: zodResolver(productSchema),
  // });

  const form = useForm<ProductSchemaData>({
    resolver: zodResolver(productSchema),
  });

  // return {
  //   register,
  //   handleSubmit,
  //   setError,
  //   reset,
  //   errors,
  //   saving,
  //   onSubmit,
  // };

  return form;
};

export default useCreateProductForm;
