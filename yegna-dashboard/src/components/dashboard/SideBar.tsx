import { Link } from "react-router-dom";
import { useState } from "react";
import { sidebarItems } from "./sidebarElements";
import logoDark from "../../assets/logo-dark.png";
// import logoLight from "../../assets/logo-light.png";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [current, setCurrent] = useState<number>(0);

  const toggleExpanded = (title: string, index: number) => {
    setExpanded((prev) => (prev === title ? null : title));
    setCurrent(index);
  };

  return (
    <div className="fixed w-60 top-0 bottom-0 bg-background-light">
      <img src={logoDark} alt="logo" className="h-12 pl-6 my-6" />
      <ul>
        {sidebarItems.map((item, index) => {
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
