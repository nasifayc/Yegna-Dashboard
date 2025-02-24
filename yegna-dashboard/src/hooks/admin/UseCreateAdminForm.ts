import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

const adminUserSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  email: z.string().email("Valid Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  roles: z.array(z.string()).default([]),
  image: z.any(),
});

export type AdminSchemaData = z.infer<typeof adminUserSchema>;

const useCreateAdminForm = () => {
  const form = useForm<AdminSchemaData>({
    resolver: zodResolver(adminUserSchema),
  });

  return form;
};

export default useCreateAdminForm;
