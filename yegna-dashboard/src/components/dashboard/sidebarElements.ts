import {
  MdOutlineDashboard,
  MdOutlineProductionQuantityLimits,
  MdOutlineShoppingBag,
} from "react-icons/md";

import { TbCategory2 } from "react-icons/tb";
import { FaRegUser, FaSortAmountDown } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { LiaUniversalAccessSolid } from "react-icons/lia";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: MdOutlineDashboard,
    subItems: [{ title: "Overview", key: "overview" }],
  },

  {
    title: "Product",
    icon: MdOutlineProductionQuantityLimits,
    subItems: [
      { title: "All", key: "product/all" },
      { title: "Add New", key: "product/add" },
    ],
  },

  {
    title: "Category",
    icon: TbCategory2,
    subItems: [
      { title: "All", key: "category/all" },
      { title: "Add New", key: "category/add" },
    ],
  },

  {
    title: "User",
    icon: FaRegUser,
    subItems: [
      { title: "All", key: "user/all" },
      //   { title: "Add New", key: "products-add" },
    ],
  },

  {
    title: "Vendor",
    icon: MdOutlineShoppingBag,
    subItems: [
      { title: "All", key: "vendor/all" },
      { title: "Add New", key: "vendor-add" },
    ],
  },

  {
    title: "Transaction",
    icon: AiOutlineTransaction,
    subItems: [{ title: "All", key: "transaction/all" }],
  },
  {
    title: "Role",
    icon: LiaUniversalAccessSolid,
    subItems: [
      { title: "All", key: "role/all" },
      { title: "Add New", key: "role-add" },
    ],
  },

  {
    title: "Permission",
    icon: FaSortAmountDown,
    subItems: [{ title: "All", key: "permission/all" }],
  },
];
