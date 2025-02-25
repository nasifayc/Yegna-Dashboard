import Loading from "@/components/Loading";
import { notify } from "@/components/Toast";
import { Button } from "@/components/ui/button";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import useCreateCategoryForm, {
  CategorySchemaData,
} from "@/hooks/product/UseCreateCategoryForm";

import { useAppSelector } from "@/store/store";
import { CATEGORY_CREATE_URL, CATEGORY_LIST_URL } from "@/utils/api/ApiRoutes";
import axios from "axios";
import { CloudUpload, Paperclip } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

interface CategoryProps {
  _id: string;
  name: string;
}
const AddCategory: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [saving, setSaving] = useState(false);
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  const token = useAppSelector((state) => state.auth.accessToken);

  const form = useCreateCategoryForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ categories: CategoryProps[] }>(
          CATEGORY_LIST_URL,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCategories(response.data.categories);
      } catch (err) {
        console.error("Error getting product list", err);
        notify(`Server Error: ${err}`);
      }
    };
    fetchData();
  }, [token]);

  const onSubmit = async (data: CategorySchemaData) => {
    setSaving(true);
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description || "");
      if (data.parentCategory) {
        formData.append("parentCategory", data.parentCategory);
      }

      if (file) {
        formData.append("image", file);
      }

      console.log(formData);

      await axios.post(`${CATEGORY_CREATE_URL}?type=category`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      notify("Product created successfully");
      form.reset();
    } catch (err) {
      console.log("Failed to save", err);
      notify("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (files: File[] | null) => {
    setFile(files && files.length > 0 ? files[0] : null); // Handle both File[] and null cases
  };

  return (
    <div className="p-6">
      <Card className="dark:bg-background-dark dark:text-text-dark">
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto py-10"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Category Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-- Select Parent Category --" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background-light">
                        {categories.length === 0 ? (
                          <p className="text-gray-500 p-2">
                            No categories available
                          </p>
                        ) : (
                          categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
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
                        value={file ? [file] : []} // Pass single file in an array
                        onValueChange={handleFileChange} // Update state
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

              <div>
                <Button type="button" onClick={() => form.reset()}>
                  Clear
                </Button>
                {saving ? <Loading /> : <Button type="submit">Submit</Button>}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default AddCategory;
