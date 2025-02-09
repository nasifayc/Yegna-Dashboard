import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { sidebarItems } from "./sidebarElements";
import { useAppSelector } from "@/store/store";
import logoDark from "../../assets/logo-dark.png";
import axios from "axios";
// import logoLight from "../../assets/logo-light.png";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { GET_PERMISSIONS_URL } from "@/utils/api/ApiRoutes";

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [permissions, setPermissions] = useState<string[]>([]);
  const isSuperAdmin = useAppSelector((state) => state.auth.isAuthenticated);
  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_PERMISSIONS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPermissions(response.data.permissions);
      } catch (err) {
        console.error("Error fetching permissions", err);
      }
    };

    if (!isSuperAdmin) {
      fetchData();
    }
  }, [isSuperAdmin, token]);

  const toggleExpanded = (title: string, index: number) => {
    setExpanded((prev) => (prev === title ? null : title));
    setCurrent(index);
  };

  return (
    <div className="fixed w-60 top-0 bottom-0 bg-background-light">
      <img src={logoDark} alt="logo" className="h-12 pl-6 my-6" />
      <ul>
        {sidebarItems.map((item, index) => {
          if (!isSuperAdmin && !permissions.includes(item.code_name)) {
            return null;
          }
          const Icon = item.icon;
          const isExpanded = expanded === item.title;

          return (
            <li
              key={item.title}
              className="w-full cursor-pointer text-gray-600"
            >
              <div
                className={`flex justify-between items-center py-3  px-6 ${
                  index === current
                    ? "bg-gradient-to-l from-primary-light to-transparent"
                    : ""
                }`}
                onClick={() => toggleExpanded(item.title, index)}
              >
                <div className="flex items-center">
                  <Icon />
                  <span className="ml-3 text-sm">{item.title}</span>
                </div>
                {isExpanded ? (
                  <MdOutlineKeyboardArrowDown />
                ) : (
                  <MdOutlineKeyboardArrowRight />
                )}
              </div>

              {isExpanded && (
                <ul className=" text-xs">
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem.key}
                      className="py-1 hover:text-primary-light pl-16 transition"
                    >
                      <Link to={`/dashboard/${subItem.key}`}>
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
