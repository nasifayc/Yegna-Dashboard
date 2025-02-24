import { useDispatch } from "react-redux";
import { logout } from "@/store/auth/authSlice";

import { BiMenuAltLeft } from "react-icons/bi";
import { RiSearch2Line } from "react-icons/ri";
import { BsMoonStars } from "react-icons/bs";
import { LuBellRing } from "react-icons/lu";
import { useEffect, useState } from "react";

import { User, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ADMIN_CURRENT_URL, API_BASE_URL } from "@/utils/api/ApiRoutes";
import { useAppSelector } from "@/store/store";
import axios from "axios";
import { notify } from "../Toast";

const NavBar: React.FC = () => {
  return (
    <div className="bg-background-light text-background-dark fixed top-0 left-60 right-0 z-10 h-24 px-6 flex justify-between items-center">
      <div className="">
        <BiMenuAltLeft
          className="text-gray-500 inline-block border-2 border-gray-300 rounded-lg mr-5"
          size={32}
        />
        <h1 className="text-xl font-semibold inline-block">DashBoared Light</h1>
      </div>
      <div className="relative w-full max-w-xs">
        <RiSearch2Line
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          placeholder="Search"
          className="pl-8 pr-2 py-2 bg-gray-200 w-full rounded-md"
        />
      </div>

      <div className="flex items-center gap-8">
        <div className=" p-1 border-2 border-gray-300 rounded-md">
          <BsMoonStars size={20} />
        </div>
        <div className=" p-1 border-2 border-gray-300 rounded-md">
          <LuBellRing size={20} />
        </div>
        {/* <UserProfileDropdown /> */}
      </div>
    </div>
  );
};

export default NavBar;

interface AdminProps {
  _id: string;
  first_name: string;
  last_name: string;
  profile_photo: string;
}

const UserProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState<AdminProps>();
  const dispatch = useDispatch();

  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ admin: AdminProps }>(
          ADMIN_CURRENT_URL,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAdmin(response.data.admin);
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

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition">
          <img
            src={`${API_BASE_URL}/${admin?.profile_photo?.replace(/\\/g, "/")}`}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">
            {admin?.first_name} {admin?.last_name}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white shadow-md rounded-md p-2">
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100">
          <User size={18} /> Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100">
          <Settings size={18} /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 text-red-500"
          onClick={() => {
            if (window.confirm("Are you sure you want to logout?")) {
              dispatch(logout());
            }
          }}
        >
          <LogOut size={18} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
