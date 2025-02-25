import { notify } from "@/components/Toast";
import { useAppSelector } from "@/store/store";
import { ROLES_DELETE_URL, ROLES_LIST_URL } from "@/utils/api/ApiRoutes";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";

interface RoleProps {
  _id: string;
  role_name: string;
  description: string;
  permissions: string[];
  createdAt: string;
}

const AllRoles: React.FC = () => {
  const [roles, setRoles] = useState<RoleProps[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const token = useAppSelector((state) => state.auth.accessToken);

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
          setRoles(response.data.roles);
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

  const deleteRole = async (id: string) => {
    try {
      await axios.delete(`${ROLES_DELETE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles((prevRoles) => prevRoles.filter((role) => role._id !== id));
      notify("Role deleted successfully");
    } catch (err) {
      console.error("Error deleting admin", err);
      let error = "Server Error";
      if (axios.isAxiosError(err)) {
        error = err.response?.data?.message;
        notify(error);
      }
    }
  };

  const totalPages = Math.ceil(roles.length / entriesPerPage);
  const paginatedVendors = roles.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
  return (
    <div className="p-6">
      <Card className="dark:bg-background-dark dark:text-text-dark">
        <CardHeader>
          <CardTitle>All Roles</CardTitle>
          <CardDescription>
            View, edit, and delete Role in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of Role</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.length === 0 ? (
                <TableRow>
                  <TableCell>
                    <p>Empty List</p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedVendors.map((role, index) => (
                  <TableRow key={role._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{role.role_name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.permissions.length}</TableCell>
                    <TableCell>
                      {new Date(role.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
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
                                  `Are you sure you want to delete ${role.role_name}?`
                                )
                              ) {
                                deleteRole(role._id);
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

export default AllRoles;
