import { useState } from "react";
import { sidebarItems } from "./sidebarElements";
import logoDark from "../../assets/logo-dark.png";
// import logoLight from "../../assets/logo-light.png";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

type SideBarProps = {
  activeBar: string;
  setActiveBar: (bar: string) => void;
};

const Sidebar: React.FC<SideBarProps> = ({ activeBar, setActiveBar }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [current, setCurrent] = useState<number>(0);

  const toggleExpanded = (title: string, index: number) => {
    setExpanded((prev) => (prev === title ? null : title));
    setCurrent(index);
  };

  return (
    <div className="w-60">
      <img src={logoDark} alt="logo" className="h-12 px-10 my-7" />
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
                className={`flex justify-between items-center py-3 px-6 ${
                  index === current
                    ? "bg-gradient-to-l from-primary-light to-transparent"
                    : ""
                }`}
                onClick={() => toggleExpanded(item.title, index)}
              >
                <div className="flex items-center">
                  <Icon />
                  <span className="ml-3">{item.title}</span>
                </div>
                {isExpanded ? (
                  <MdOutlineKeyboardArrowUp />
                ) : (
                  <MdOutlineKeyboardArrowDown />
                )}
              </div>

              {isExpanded && (
                <ul className="pl-16 text-sm">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.key}>
                      <div
                        onClick={() => setActiveBar(subItem.key)}
                        className="py-1"
                      >
                        {subItem.title}
                      </div>
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
