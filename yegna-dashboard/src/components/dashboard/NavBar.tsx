import { useDispatch } from "react-redux";
import { logout } from "@/store/auth/authSlice";

import { BiMenuAltLeft } from "react-icons/bi";
import { RiSearch2Line } from "react-icons/ri";
import { BsMoonStars } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
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

import useDarkMode from "@/hooks/theme/UseTheme";
import profile from "../../assets/profile.png";

const NavBar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="transition bg-background-light dark:dark:bg-gray-800  text-background-dark dark:text-background-light fixed top-0 left-60 right-0 z-10 h-24 px-6 flex justify-between items-center">
      <div className="flex">
        <BiMenuAltLeft
          className="text-gray-500 inline-block border-2 border-gray-300 rounded-lg mr-5 "
          size={32}
        />
        <h1 className=" text-xl font-semibold inline-block">
          DashBoared Light
        </h1>
      </div>
      <div className="relative w-full max-w-xs">
        <RiSearch2Line
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 transition dark:text-gray-400"
          size={18}
        />
        <input
          placeholder="Search"
          className="pl-8 pr-2 py-2 bg-gray-200 dark:bg-gray-500 transition w-full rounded-md"
        />
      </div>

      <div className="flex items-center gap-8">
        <div className=" p-1 border-2 border-gray-300 rounded-md cursor-pointer">
          {darkMode ? (
            <FiSun size={20} onClick={toggleDarkMode} />
          ) : (
            <BsMoonStars size={20} onClick={toggleDarkMode} />
          )}
        </div>
        <div className=" p-1 border-2 border-gray-300 rounded-md">
          <LuBellRing size={20} />
        </div>
        <UserProfileDropdown />
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
        console.error("Error getting admin", err);
      }
    };
    fetchData();
  }, [token]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className="dark:bg-transparent dark:border-gray-600 dark:border-2 transition"
      >
        <button className="flex items-center gap-2 px-4 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition ">
          <img
            src={
              admin?.profile_photo
                ? `${API_BASE_URL}/${admin.profile_photo.replace(/\\/g, "/")}`
                : profile
            }
            alt={"Profile"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">
            {admin?.first_name} {admin?.last_name}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-background-light dark:bg-gray-800 dark:border-none dark:text-background-light shadow-md rounded-md p-2">
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <User size={18} /> Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <Settings size={18} /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-red-500"
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
