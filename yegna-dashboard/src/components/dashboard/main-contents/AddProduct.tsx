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
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/extension/file-upload";
import { TagsInput } from "@/components/ui/extension/tags-input";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import useCreateProductForm, {
  ProductSchemaData,
} from "@/hooks/product/UseCreateProductForm";
import { useAppSelector } from "@/store/store";
import { CATEGORY_LIST_URL, PRODUCT_CREATE_URL } from "@/utils/api/ApiRoutes";
import axios from "axios";
import { CloudUpload, Paperclip } from "lucide-react";
import { useEffect, useState } from "react";

interface CategoryProps {
  _id: string;
  name: string;
}

const AddProduct: React.FC = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const [saving, setSaving] = useState(false);
  const token = useAppSelector((state) => state.auth.accessToken);

  const form = useCreateProductForm();

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

  const onSubmit = async (data: ProductSchemaData) => {
    setSaving(true);
    try {
      const formData = new FormData();
      // Required fields
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("stock", data.stock.toString());
      formData.append("category", data.category);

      // Optional fields
      if (data.description) formData.append("description", data.description);
      if (data.brand) formData.append("brand", data.brand);
      if (data.sku) formData.append("sku", data.sku);
      if (data.discount !== undefined)
        formData.append("discount", data.discount.toString());

      // Boolean values need to be strings for FormData
      if (data.isFeatured !== undefined)
        formData.append("isFeatured", data.isFeatured.toString());
      if (data.isNew !== undefined)
        formData.append("isNew", data.isNew.toString());
      if (data.isTrending !== undefined)
        formData.append("isTrending", data.isTrending.toString());

      if (data.tags && data.tags.length > 0) {
        data.tags.forEach((tag) => formData.append("tags", tag));
      }

      if (files) {
        files.forEach((file) => formData.append("images", file));
      }
      await axios.post(PRODUCT_CREATE_URL, formData, {
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
  // const { register, handleSubmit, errors, saving, onSubmit, reset } =
  //   useCreateProductForm();

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          {/* <CardDescription>product form </CardDescription> */}
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
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product Name"
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Price"
                        type="number"
                        step={0.001}
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? parseFloat(e.target.value) : ""
                          )
                        }
                      />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="stock"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const intValue = parseInt(e.target.value, 10);
                          field.onChange(isNaN(intValue) ? null : intValue);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      How many products are currently available?
                    </FormDescription>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-- Select Category --" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background-light">
                        {categories.length == 0 ? (
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
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Brand" type="text" {...field} />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your tags.</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Enter your tags"
                      />
                    </FormControl>

                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        The product will appear in the{" "}
                        <span className="font-bold">Featured</span> category of
                        users feed.
                      </FormDescription>
                      <FormMessage className="text-red-600" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isNew"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>New</FormLabel>
                      <FormDescription>
                        The product will appear in the{" "}
                        <span className="font-bold">New</span> category of users
                        feed.
                      </FormDescription>
                      <FormMessage className="text-red-600" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isTrending"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Trending</FormLabel>
                      <FormDescription>
                        The product will appear in the{" "}
                        <span className="font-bold">Trending</span> category of
                        users feed.
                      </FormDescription>
                      <FormMessage className="text-red-600" />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Discount"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const intValue = parseInt(e.target.value, 10);
                          field.onChange(isNaN(intValue) ? null : intValue);
                        }}
                      />
                    </FormControl>
                    {/* <FormDescription>
                      Discount will attract users 50x larger.
                    </FormDescription> */}
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="sku" type="text" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      Stock Keeping Unit Identifier
                    </FormDescription> */}
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>Select Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={files}
                        onValueChange={setFiles}
                        dropzoneOptions={dropZoneConfig}
                        className="relative bg-background rounded-lg p-2"
                      >
                        <FileInput
                          id="fileInput"
                          className="outline-dashed outline-1 outline-slate-500"
                        >
                          <div className="flex items-center justify-center flex-col p-8 w-full ">
                            <CloudUpload className="text-gray-500 w-10 h-10" />
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              &nbsp; or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF
                            </p>
                          </div>
                        </FileInput>
                        <FileUploaderContent>
                          {files &&
                            files.length > 0 &&
                            files.map((file, i) => (
                              <FileUploaderItem key={i} index={i}>
                                <Paperclip className="h-4 w-4 stroke-current" />
                                <span>{file.name}</span>
                              </FileUploaderItem>
                            ))}
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
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default AddProduct;
