import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";

import { useModal } from "../../context/ModalContext";

const NavBar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");

  const { setShowSignIn } = useModal();

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "service", "about-us", "testimonies"];
      let foundSection = activeSection;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            foundSection = section;
          }
        }
      });

      if (foundSection !== activeSection) {
        setActiveSection(foundSection);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  return (
    <nav
      className={`bg-background-dark py-8 px-24 flex justify-between fixed top-0 w-full z-10 transition-transform duration-300 `}
    >
      <img src={logo} alt="Logo" />
      <ul className="flex space-x-12">
        {[
          { id: "home", label: "Home" },
          { id: "service", label: "Service" },
          { id: "about-us", label: "About Us" },
          { id: "testimonies", label: "Testimonies" },
        ].map((item) => (
          <li key={item.id} className="relative group">
            <a
              href={`#${item.id}`}
              className={`text-text-dark hover:text-primary-light whitespace-nowrap transition duration-300 ${
                activeSection === item.id ? "text-primary-light" : ""
              }`}
            >
              {item.label}
            </a>

            <span
              className={`absolute bottom-0 left-0 w-full h-[4px] bg-primary-light rounded-sm transform transition-all duration-300 ${
                activeSection === item.id
                  ? "scale-100 opacity-100"
                  : "scale-0 opacity-0"
              } group-hover:scale-100 group-hover:opacity-100`}
            ></span>
          </li>
        ))}
        <li>
          <button
            onClick={handleSignInClick}
            className="px-4 py-1 sm:px-6 sm:py-2 border-white border-2 hover:border-primary-light rounded-full text-text-dark hover:text-primary-light transition duration-300 whitespace-nowrap flex items-center justify-center"
          >
            Sign In
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
