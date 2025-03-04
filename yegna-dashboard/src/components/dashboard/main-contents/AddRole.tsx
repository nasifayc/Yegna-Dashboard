import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PERMISSION_LIST_URL, ROLES_CREATE_URL } from "@/utils/api/ApiRoutes";
import axios from "axios";
import { notify } from "@/components/Toast";
import Loading from "@/components/Loading";
import { useAppSelector } from "@/store/store";

import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

interface PermissionsProp {
  _id: string;
  description: string;
}

const CreateRole: React.FC = () => {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<PermissionsProp[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ permissions: PermissionsProp[] }>(
          PERMISSION_LIST_URL,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPermissions(response.data.permissions);
      } catch (err) {
        console.error("Error getting permissions", err);
        if (axios.isAxiosError(err)) {
          notify(err.response?.data?.message);
        } else {
          notify("Server Error");
        }
      }
    };
    fetchData();
  }, []);

  const handlePermissionChange = async (pId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(pId) ? prev.filter((id) => id !== pId) : [...prev, pId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      role_name: roleName,
      description,
      permissions: selectedPermissions,
    };
    try {
      const response = await axios.post(ROLES_CREATE_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setLoading(false);
        setDescription("");
        setPermissions([]);
        setSelectedPermissions([]);
        notify("Role created successfully");
        return;
      }
    } catch (err) {
      console.error("Error creating role", err);
      if (axios.isAxiosError(err)) {
        notify(err.response?.data?.message);
      } else {
        notify("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="dark:bg-gray-800 dark:border-none transition dark:text-text-dark">
        <CardHeader>
          <CardTitle>Create Role</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <div>
              <Label htmlFor="roleName">Role Name</Label>

              <Input
                id="roleName"
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter role name"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description (Optional)"
              />
            </div>

            <div>
              <Label className="text-xl ">Permissions</Label>
              {loading ? (
                <Loading />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4 mt-10">
                  {permissions.map((permission) => (
                    <div
                      key={permission._id}
                      className="flex justify-start items-center space-x-3"
                    >
                      <Checkbox
                        id={permission._id}
                        checked={selectedPermissions.includes(permission._id)}
                        onCheckedChange={() =>
                          handlePermissionChange(permission._id)
                        }
                        className="border-gray-400"
                      />
                      <Label htmlFor={permission._id} className="font-normal ">
                        {permission.description}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary-light text-white py-2 px-5 rounded"
            >
              {loading ? <Loading /> : "Create Role"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRole;
