import { notify } from "@/components/Toast";
import { useAppSelector } from "@/store/store";

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
import { PERMISSION_LIST_URL } from "@/utils/api/ApiRoutes";

interface PermissionProps {
  _id: string;
  model: string;
  code_name: string;
  description: string;
  user_type: [string];
  createdAt: Date;
}
const AllPermissions: React.FC = () => {
  const [permissions, setPermissions] = useState<PermissionProps[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ permissions: PermissionProps[] }>(
          PERMISSION_LIST_URL,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPermissions(response.data.permissions);
      } catch (err) {
        console.error("Error getting product list", err);
        notify(`Server Error: ${err}`);
      }
    };
    fetchData();
  }, [token]);

  const totalPages = Math.ceil(permissions.length / entriesPerPage);
  const paginatedPermissions = permissions.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="p-6">
      <Card className="dark:bg-background-dark dark:text-text-dark">
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
          <CardDescription>View permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of Permissions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Code Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.length === 0 ? (
                <TableRow>
                  <TableCell>Empty List</TableCell>
                </TableRow>
              ) : (
                paginatedPermissions.map((permission, index) => (
                  <TableRow key={permission._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{permission.model}</TableCell>

                    <TableCell>{permission.code_name}</TableCell>
                    <TableCell>{permission.description}</TableCell>
                    <TableCell>
                      {permission.user_type.map((type) => (
                        <p>{type}</p>
                      ))}
                    </TableCell>
                    <TableCell>
                      {new Date(permission.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
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

export default AllPermissions;
