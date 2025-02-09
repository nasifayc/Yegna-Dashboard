import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <div className="p-4 bg-gray-50  pl-60 py-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
