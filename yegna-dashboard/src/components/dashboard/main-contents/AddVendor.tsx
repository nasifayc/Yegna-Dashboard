import Loading from "@/components/Loading";
import { notify } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "react-multi-select-component";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/extension/file-upload";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useAppSelector } from "@/store/store";
import { ADMINS_LIST_URL, ROLES_LIST_URL } from "@/utils/api/ApiRoutes";
import axios from "axios";
import { CloudUpload, Paperclip } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import useCreateAdminForm, {
  AdminSchemaData,
} from "@/hooks/admin/UseCreateAdminForm";

interface RoleProps {
  _id: string;
  role_name: string;
}

interface Option {
  value: string;
  label: string;
}
const AddVendor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [roles, setRoles] = useState<Option[]>([]);

  const [saving, setSaving] = useState(false);
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  const token = useAppSelector((state) => state.auth.accessToken);

  const form = useCreateAdminForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ roles: RoleProps[] }>(
          ROLES_LIST_URL,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          const formattedRoles: Option[] = response.data.roles.map(
            (role: RoleProps) => ({
              value: role._id,
              label: role.role_name,
            })
          );
          setRoles(formattedRoles);
        }
      } catch (err) {
        let error = "Server Error";
        if (axios.isAxiosError(err)) {
          error = err.response?.data?.message;
          notify(error);
        }
        console.error("Error getting Role list", err);
      }
    };
    fetchData();
  }, [token]);

  const onSubmit = async (data: AdminSchemaData) => {
    setSaving(true);
    try {
      const formData = new FormData();

      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      if (data.roles && data.roles.length > 0) {
        data.roles.forEach((role) => formData.append("roles", role));
      }

      if (file) {
        formData.append("image", file);
      }

      console.log(formData);

      await axios.post(`${ADMINS_LIST_URL}?type=profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      notify("Admin created successfully");
      form.reset();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notify(`Server Error: ${err.response?.data?.message}`);
      }
      console.log("Failed to save", err);
      notify("Failed to Create Admin");
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (files: File[] | null) => {
    setFile(files && files.length > 0 ? files[0] : null);
  };

  return (
    <div className="p-6">
      <Card className="dark:bg-gray-800 dark:border-none transition dark:text-text-dark">
        <CardHeader>
          <CardTitle>Register New Admin/Seller</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto py-10"
            >
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" type="text" {...field} />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" type="text" {...field} />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Roles</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={roles}
                        value={roles.filter((role) =>
                          field.value?.includes(role.value)
                        )}
                        onChange={(selected: Option[]) =>
                          field.onChange(selected.map((r) => r.value))
                        }
                        labelledBy="Select Roles"
                      />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Select Image</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={file ? [file] : []}
                        onValueChange={handleFileChange}
                        dropzoneOptions={dropZoneConfig}
                        className="relative bg-background rounded-lg p-2"
                      >
                        <FileInput
                          id="fileInput"
                          className="outline-dashed outline-1 outline-slate-500"
                        >
                          <div className="flex items-center justify-center flex-col p-8 w-full">
                            <CloudUpload className="text-gray-500 w-10 h-10" />
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              &nbsp; or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG, or GIF
                            </p>
                          </div>
                        </FileInput>
                        <FileUploaderContent>
                          {file && (
                            <FileUploaderItem index={0}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          )}
                        </FileUploaderContent>
                      </FileUploader>
                    </FormControl>
                    <FormDescription>Select a file to upload.</FormDescription>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <div className="flex justify-start space-x-4">
                <Button
                  type="button"
                  onClick={() => form.reset()}
                  className="bg-red-400"
                >
                  Clear
                </Button>
                {saving ? (
                  <Loading />
                ) : (
                  <Button type="submit" className="bg-primary-light">
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default AddVendor;
