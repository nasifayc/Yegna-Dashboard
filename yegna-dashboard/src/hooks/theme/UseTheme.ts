import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Sync with local storage and update document class
  useEffect(() => {
    const savedMode = localStorage.getItem("theme") === "dark";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode);
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");

      return newMode;
    });
  };

  return { darkMode, toggleDarkMode };
};

export default useDarkMode;
