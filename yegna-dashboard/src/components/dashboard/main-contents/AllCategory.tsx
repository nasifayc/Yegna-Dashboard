import { notify } from "@/components/Toast";
import { useAppSelector } from "@/store/store";
import {
  API_BASE_URL,
  CATEGORY_DELETE_URL,
  CATEGORY_LIST_URL,
} from "@/utils/api/ApiRoutes";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface CategoryProps {
  _id: string;
  name: string;
  image: string | null;
  parentCategory: { name: string } | null;
  isActive: boolean | null;
  createdAt: Date;
}
const AllCategory: React.FC = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const token = useAppSelector((state) => state.auth.accessToken);

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

  const deleteCategory = async (id: string) => {
    console.log("Id: " + id);
    try {
      await axios.delete(`${CATEGORY_DELETE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories((prevCategories) =>
        prevCategories.filter((c) => c._id !== id)
      );
      notify("Category deleted successfully");
    } catch (err) {
      console.error("Error deleting category", err);
      notify(`Server Error: ${err}`);
    }
  };

  const totalPages = Math.ceil(categories.length / entriesPerPage);
  const paginatedCategories = categories.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            View, edit, and delete product categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of Categories</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Parent Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <p>Empty List</p>
              ) : (
                paginatedCategories.map((category, index) => (
                  <TableRow key={category._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <img
                        src={`${API_BASE_URL}/${category.image?.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt="Category Image"
                        className="w-10 h-10 rounded-full"
                      />
                    </TableCell>
                    <TableCell>{category.parentCategory?.name}</TableCell>
                    <TableCell>
                      {category.isActive ? "Active" : "In Active"}
                    </TableCell>
                    <TableCell>
                      {new Date(category.createdAt).toISOString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Edit</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to delete ${category.name}?`
                                )
                              ) {
                                deleteCategory(category._id);
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

export default AllCategory;
