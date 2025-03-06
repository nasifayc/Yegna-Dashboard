import { notify } from "@/components/Toast";
import { useAppSelector } from "@/store/store";
import { CATEGORY_DELETE_URL, CATEGORY_LIST_URL } from "@/utils/api/ApiRoutes";
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
  // TableCaption,
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
      <Card className="dark:bg-gray-800 dark:border-none transition dark:text-text-dark">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription className="text-gray-400 ">
            Track and Manage Product Categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-200 dark:bg-gray-500  text-background-dark">
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
                <TableRow>
                  <TableCell>Empty List</TableCell>
                </TableRow>
              ) : (
                paginatedCategories.map((category, index) => (
                  <TableRow
                    key={category._id}
                    className={
                      index % 2 !== 0
                        ? "bg-gray-200  dark:bg-gray-500 transition text-background-dark"
                        : ""
                    }
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <img
                        src={category.image || ""}
                        alt="Category Image"
                        className="w-10 h-10 rounded-full"
                      />
                    </TableCell>
                    <TableCell>{category.parentCategory?.name}</TableCell>
                    <TableCell>
                      {category.isActive ? "Active" : "In Active"}
                    </TableCell>
                    <TableCell>
                      {new Date(category.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="bg-red-500 px-3 py-2 rounded-md text-white">
                          Actions
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-200 mx-1" />
                          <DropdownMenuItem className=" hover:bg-gray-100 rounded-md cursor-pointer transition dark:hover:text-background-dark ">
                            Edit
                          </DropdownMenuItem>
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
                            className=" hover:bg-gray-100 rounded-md cursor-pointer transition dark:hover:text-background-dark "
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

export default AllCategory;
