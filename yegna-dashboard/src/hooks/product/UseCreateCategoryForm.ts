import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().nonempty("Category name is required").trim(),
  description: z.string().trim().optional(),
  parentCategory: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Category must be a valid MongoDB ObjectId")
    .optional(),
  image: z.string().url().trim().nonempty("Image URL is required"),
});

export type CategorySchemaData = z.infer<typeof categorySchema>;

const useCreateCategoryForm = () => {
  const form = useForm<CategorySchemaData>({
    resolver: zodResolver(categorySchema),
  });

  return form;
};

export default useCreateCategoryForm;
