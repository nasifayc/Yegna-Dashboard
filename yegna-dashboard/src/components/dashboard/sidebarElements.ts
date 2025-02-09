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
    code_name: "can_view_dashboard",
    subItems: [{ title: "Overview", key: "overview" }],
  },

  {
    title: "Product",
    icon: MdOutlineProductionQuantityLimits,
    code_name: "can_view_products",
    subItems: [
      { title: "All", key: "product/all" },
      { title: "Add New", key: "product/add" },
    ],
  },

  {
    title: "Category",
    icon: TbCategory2,
    code_name: "can_view_category",
    subItems: [
      { title: "All", key: "category/all" },
      { title: "Add New", key: "category/add" },
    ],
  },

  {
    title: "User",
    icon: FaRegUser,
    code_name: "can_view_user",
    subItems: [
      { title: "All", key: "user/all" },
      //   { title: "Add New", key: "products-add" },
    ],
  },

  {
    title: "Vendor",
    icon: MdOutlineShoppingBag,
    code_name: "can_view_sellers",
    subItems: [
      { title: "All", key: "vendor/all" },
      { title: "Add New", key: "vendor-add" },
    ],
  },

  {
    title: "Transaction",
    icon: AiOutlineTransaction,
    code_name: "can_view_purchases",
    subItems: [{ title: "All", key: "transaction/all" }],
  },
  {
    title: "Role",
    icon: LiaUniversalAccessSolid,
    code_name: "can_view_roles",
    subItems: [
      { title: "All", key: "role/all" },
      { title: "Add New", key: "role-add" },
    ],
  },

  {
    title: "Permission",
    icon: FaSortAmountDown,
    code_name: "can_view_Permissions",
    subItems: [{ title: "All", key: "permission/all" }],
  },
];
