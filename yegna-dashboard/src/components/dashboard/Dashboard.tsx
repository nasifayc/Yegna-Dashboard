import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <div className="p-4 bg-gray-200 h-screen px-60 py-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
