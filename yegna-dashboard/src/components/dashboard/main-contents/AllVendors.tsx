import { notify } from "@/components/Toast";
import { useAppSelector } from "@/store/store";
import { ADMINS_LIST_URL } from "@/utils/api/ApiRoutes";
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

interface VendorProps {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  roles: [{ role_name: string }];
  createdAt: string;
}

const AllVendors: React.FC = () => {
  const [vendors, setVendors] = useState<VendorProps[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ admins: VendorProps[] }>(
          ADMINS_LIST_URL,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("role", response.data.admins);

        setVendors(response.data.admins);
      } catch (err) {
        let error = "Server Error";
        if (axios.isAxiosError(err)) {
          error = err.response?.data?.message;
          notify(error);
        }
        console.error("Error getting product list", err);
      }
    };
    fetchData();
  }, [token]);

  const deleteVendor = async (id: string) => {
    try {
      await axios.delete(`${ADMINS_LIST_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendors((prevVendors) =>
        prevVendors.filter((vendor) => vendor._id !== id)
      );
      notify("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting admin", err);
      let error = "Server Error";
      if (axios.isAxiosError(err)) {
        error = err.response?.data?.message;
        notify(error);
      }
    }
  };

  const totalPages = Math.ceil(vendors.length / entriesPerPage);
  const paginatedVendors = vendors.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
  return (
    <div className="p-6">
      <Card className="dark:bg-gray-800 dark:border-none transition dark:text-text-dark">
        <CardHeader>
          <CardTitle>Admins List</CardTitle>
          <CardDescription className="text-gray-400 ">
            Track and Manage Admins
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-200 dark:bg-gray-500  text-background-dark">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Is Active</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.length === 0 ? (
                <TableRow>
                  <TableCell>
                    <p>Empty List</p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedVendors.map((vendor, index) => (
                  <TableRow
                    key={vendor._id}
                    className={
                      index % 2 !== 0
                        ? "bg-gray-200  dark:bg-gray-500 transition text-background-dark"
                        : ""
                    }
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {vendor.first_name} {vendor.last_name}
                    </TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>
                      {vendor.roles.map((r) => (
                        <p className="mr-1">{r.role_name}</p>
                      ))}
                    </TableCell>
                    <TableCell>
                      {vendor.is_active ? "Active" : "In Active"}
                    </TableCell>

                    <TableCell>
                      {new Date(vendor.createdAt).toLocaleDateString("en-US", {
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
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-200 mx-1" />
                          <DropdownMenuItem className=" hover:bg-gray-100 rounded-md cursor-pointer transition dark:hover:text-background-dark ">
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to delete ${vendor.first_name}?`
                                )
                              ) {
                                deleteVendor(vendor._id);
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

export default AllVendors;
