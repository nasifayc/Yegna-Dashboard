import { useState } from "react";
import MainContent from "./main-contents/MainContent";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";

const Dashboard: React.FC = () => {
  const [activeBar, setActiveBar] = useState<string>("dashboard");
  return (
    <div className="flex h-screen">
      <Sidebar activeBar={activeBar} setActiveBar={setActiveBar} />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <MainContent activeBar={activeBar} />
      </div>
    </div>
  );
};

export default Dashboard;
