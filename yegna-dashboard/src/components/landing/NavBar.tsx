import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4 fixed top-0 w-full z-10">
      <ul className="flex space-x-4">
        <li>
          <a href="#home" className="text-white hover:text-gray-300">
            Home
          </a>
        </li>
        <li>
          <a href="#service" className="text-white hover:text-gray-300">
            Service
          </a>
        </li>
        <li>
          <a href="#testimonies" className="text-white hover:text-gray-300">
            Testimonies
          </a>
        </li>
        <li>
          <a href="#about-us" className="text-white hover:text-gray-300">
            About Us
          </a>
        </li>
        <li>
          <a href="#sign-in" className="text-white hover:text-gray-300">
            Sign In
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
