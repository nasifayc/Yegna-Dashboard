import { notify } from "@/components/Toast";
import { useAppSelector } from "@/store/store";
import { PRODUCT_DELETE_URL, PRODUCT_LIST_URL } from "@/utils/api/ApiRoutes";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";

interface ProductProps {
  _id: string;
  images: string[];
  name: string;
  price: number;
  stock: number;
  category: { _id: string; name: string };
  averageRating: number;
  updatedAt: string;
}

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ products: ProductProps[] }>(
          PRODUCT_LIST_URL,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProducts(response.data.products);
      } catch (err) {
        console.error("Error getting product list", err);
        notify(`Server Error: ${err}`);
      }
    };
    fetchData();
  }, [token]);

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`${PRODUCT_DELETE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      notify("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting category", err);
      notify(`Server Error: ${err}`);
    }
  };

  const totalPages = Math.ceil(products.length / entriesPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
  return (
    <div className="p-6">
      <Card className="dark:bg-gray-800 dark:border-none transition dark:text-text-dark">
        <CardHeader>
          <CardTitle>Products List</CardTitle>
          <CardDescription className="text-gray-400 ">
            Track and Manage Products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="">
            <TableHeader className="bg-gray-200 dark:bg-gray-500 transition   text-background-dark">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell>Empty List</TableCell>
                </TableRow>
              ) : (
                paginatedProducts.map((product, index) => (
                  <TableRow
                    key={product._id}
                    className={
                      index % 2 !== 0
                        ? "bg-gray-200 dark:bg-gray-500 transition text-background-dark"
                        : ""
                    }
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={product.images[0]}
                        alt="Product Image"
                        className="w-10 h-10 rounded-full"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category?.name}</TableCell>
                    <TableCell>{product.averageRating}</TableCell>
                    <TableCell>
                      {new Date(product.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="bg-red-500 px-3 py-2 rounded-md text-white">
                          Actions
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light">
                          <DropdownMenuLabel className=" transition  ">
                            Actions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-200 mx-1" />
                          <DropdownMenuItem className=" hover:bg-gray-100 rounded-md cursor-pointer transition dark:hover:text-background-dark ">
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className=" hover:bg-gray-100 rounded-md cursor-pointer transition dark:hover:text-background-dark "
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to delete ${product.name}?`
                                )
                              ) {
                                deleteProduct(product._id);
                              }
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div>
            <div>
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="bg-gray-200 dark:bg-gray-500 transition text-background-dark p-1 mx-2 rounded-md"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>
            <div className="pt-10">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-gray-500"
              >
                Prev
              </Button>
              <span className="mx-3">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-500"
              >
                Next
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default AllProducts;
