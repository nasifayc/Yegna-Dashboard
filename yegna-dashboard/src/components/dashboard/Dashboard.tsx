import MainContent from "./main-contents/MainContent";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
