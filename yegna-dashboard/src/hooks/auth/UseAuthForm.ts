import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

import { AxiosError } from "axios";
import { notify } from "../../components/Toast";
import useAuthApiCall from "./UseAuthApiCall";
import { ValidationError } from "../../interface/Interface";
import { useModal } from "../../context/ModalContext";

const loginScheme = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

export type LoginFormData = z.infer<typeof loginScheme>;

const useAuthForm = () => {
  const [loading, setLoading] = useState(false);
  const { setShowSignIn } = useModal();
  const handleCloseModal = () => {
    setShowSignIn(false);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginScheme),
  });

  const { handleLogin } = useAuthApiCall();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await handleLogin(data);
      handleCloseModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{
          errors: ValidationError[];
          message: string;
        }>;

        if (axiosError.response?.data?.message) {
          notify(`${axiosError.response?.data?.message}`);
          return;
        }

        if (axiosError.response?.data?.errors) {
          const validationErrors = axiosError.response.data.errors;

          const fieldErrors: Record<string, string[]> = {};
          validationErrors.forEach((err) => {
            if (!fieldErrors[err.path]) {
              fieldErrors[err.path] = [];
            }
            fieldErrors[err.path].push(err.msg);
          });
          console.log("Field-specific errors:", fieldErrors);

          Object.entries(fieldErrors).forEach(([field, messages]) => {
            setError(field as keyof LoginFormData, {
              type: "manual",
              message: messages.join(", "),
            });
          });
          notify("Please correct the highlighted fields.");
        } else {
          notify("Server Error. Please try again later!");
        }
      } else {
        notify("An unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    setError,
    errors,
    loading,
    onSubmit,
    notify,
  };
};

export default useAuthForm;
