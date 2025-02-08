import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./components/dashboard/Dashboard";
// import Dashboard from "./pages/Dashboard";
// import { useEffect, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

// function App() {
//   const [darkMode, setDarkMode] = useState(false);

// //Sync with local storage (optional)
//   useEffect(() => {
//     const savedMode = localStorage.getItem("theme") === "dark";
//     setDarkMode(savedMode);
//     document.documentElement.classList.toggle("dark", savedMode);
//   }, []);

//   const toggleDarkMode = () => {
//     setDarkMode((prev) => {
//       const newMode = !prev;
//       document.documentElement.classList.toggle("dark", newMode);
//       localStorage.setItem("theme", newMode ? "dark" : "light");
//       return newMode;
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
//       <div className="container mx-auto px-4 py-6">
//         <h1 className="text-4xl font-bold mb-4">Yegna Dashboard</h1>
//         <p className="mb-6 ">
//           This is a demo of Tailwind's dark and light mode with custom themes.
//         </p>
//         <button
//           onClick={toggleDarkMode}
//           className="px-4 py-2 rounded-lg bg-primary-light text-white dark:bg-primary-dark"
//         >
//           Toggle {darkMode ? "Light" : "Dark"} Mode
//         </button>
//       </div>
//     </div>
//   );
// }

export default App;
