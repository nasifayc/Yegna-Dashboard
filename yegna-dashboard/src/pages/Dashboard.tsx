// import { useState } from "react";
// import { Moon, Sun, Bell } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const Sidebar = ({ setActiveModule }) => {
//   const modules = [
//     "Dashboard",
//     "Products",
//     "Users",
//     "Sellers",
//     "Transactions",
//     "Roles",
//     "Permissions",S
//   ];
//   return (
//     <div className="w-64 bg-gray-900 text-white h-screen p-4">
//       <h2 className="text-2xl font-bold mb-4">Logo</h2>
//       <ul>
//         {modules.map((module) => (
//           <li key={module} className="mb-2">
//             <button
//               onClick={() => setActiveModule(module)}
//               className="w-full text-left p-2 hover:bg-gray-700 rounded"
//             >
//               {module}
//             </button>
//             <ul className="ml-4 text-sm">
//               <li className="p-1 hover:bg-gray-700 rounded">View All</li>
//               <li className="p-1 hover:bg-gray-700 rounded">Add New</li>
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const TopNavBar = ({ darkMode, setDarkMode }) => {
//   return (
//     <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow">
//       <h1 className="text-xl font-bold">Dashboard</h1>
//       <div className="flex items-center gap-4">
//         <Input placeholder="Search..." className="w-64" />
//         <Button onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <Sun /> : <Moon />}
//         </Button>
//         <Bell className="cursor-pointer" />
//         <div className="w-10 h-10 bg-gray-400 rounded-full" />
//       </div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [activeModule, setActiveModule] = useState("Dashboard");
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <div className={darkMode ? "dark" : ""}>
//       <div className="flex h-screen">
//         <Sidebar setActiveModule={setActiveModule} />
//         <div className="flex-1 flex flex-col">
//           <TopNavBar darkMode={darkMode} setDarkMode={setDarkMode} />
//           <div className="p-6">Current Section: {activeModule}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
