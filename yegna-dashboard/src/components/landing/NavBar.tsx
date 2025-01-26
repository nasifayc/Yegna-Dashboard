import React from "react";
import logo from "../../assets/logo.png";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-background-dark  py-10 px-24 flex justify-between fixed top-0 w-full z-10">
      <img src={logo} alt="Logo" />
      <ul className="flex space-x-12">
        <li>
          <a href="#home" className="text-text-dark hover:text-gray-300">
            Home
          </a>
        </li>
        <li>
          <a href="#service" className="text-text-dark hover:text-gray-300">
            Service
          </a>
        </li>
        <li>
          <a href="#testimonies" className="text-text-dark hover:text-gray-300">
            Testimonies
          </a>
        </li>
        <li>
          <a href="#about-us" className="text-text-dark hover:text-gray-300">
            About Us
          </a>
        </li>
        <li>
          <a href="#sign-in" className="text-text-dark hover:text-gray-300">
            Sign In
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
