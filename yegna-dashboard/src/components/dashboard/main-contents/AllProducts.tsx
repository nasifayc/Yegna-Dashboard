import { notify } from "@/components/Toast";
import { useAppSelector } from "@/store/store";
import { PRODUCT_LIST_URL } from "@/utils/api/ApiRoutes";
import axios from "axios";
import { useEffect, useState } from "react";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";

interface ProductProps {
  id: number;
  images: string[];
  name: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  createdAt: string;
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

  const totalPages = Math.ceil(products.length / entriesPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            View, edit, and delete products in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your Products</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <p>Empty List</p>
              ) : (
                paginatedProducts.map((product, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img src={`${product.images[0]}`} alt="Product Image" />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.rating}</TableCell>
                    <TableCell>
                      {new Date(product.createdAt).toLocaleString()}
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
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>
            <div>
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
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
