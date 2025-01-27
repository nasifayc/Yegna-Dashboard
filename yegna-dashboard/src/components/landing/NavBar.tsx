import logo from "../../assets/logo.png";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-background-dark  py-10 px-24 flex justify-between fixed top-0 w-full z-10">
      <img src={logo} alt="Logo" />
      <ul className="flex space-x-12">
        <li>
          <a href="#home" className="text-text-dark hover:text-primary-light">
            Home
          </a>
        </li>
        <li>
          <a
            href="#service"
            className="text-text-dark hover:text-primary-light"
          >
            Service
          </a>
        </li>

        <li>
          <a
            href="#about-us"
            className="text-text-dark hover:text-primary-light"
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="#testimonies"
            className="text-text-dark hover:text-primary-light"
          >
            Testimonies
          </a>
        </li>
        <li>
          <button className=" px-4 py-1 border-white border-2 hover:border-primary-light rounded-full   text-text-dark hover:text-primary-light transition duration-300">
            Sign In
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
