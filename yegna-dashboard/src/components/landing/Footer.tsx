import {
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { FaGithub, FaTelegram } from "react-icons/fa6";

const Footer: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home");
      const scrollTop = window.scrollY;

      if (homeSection) {
        const homeBottom =
          homeSection.getBoundingClientRect().bottom + scrollTop;
        setShowScrollButton(scrollTop > homeBottom);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background-dark text-gray-300 py-16 px-8 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <img className="mb-3" src={logo} alt="Logo" />
          <p className="text-sm leading-6">
            We provide exceptional services and innovative solutions for all
            your needs. Our mission is to ensure customer satisfaction and
            excellence in every project.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold text-primary-light mb-4">
            Quick Links
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#about-us"
                className="hover:text-primary-light transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="hover:text-primary-light transition"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#testimonies"
                className="hover:text-primary-light transition"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-primary-light transition"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h2 className="text-2xl font-bold text-primary-light mb-4">
            Subscribe
          </h2>
          <p className="text-sm leading-6 mb-4">
            Stay updated with the latest news and special offers.
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="mt-8 px-6 py-3 border-white border-2  text-white hover:text-primary-light rounded-full hover:border-primary-light transition duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Developed By Nasifay. All rights
          reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://t.me/Nasi_c "
            target="blank"
            className="text-gray-400 hover:text-primary-light transition"
            aria-label="Telegram"
          >
            <FaTelegram />
          </a>
          <a
            href="https://github.com/nasifayc "
            target="blank"
            className="text-gray-400 hover:text-primary-light transition"
            aria-label="Github"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/nasifay-chala-810844282/?lipi=urn%3ali%3apage%3ad_flagship3_profile_view_base_contact_details%3b7bvdsgy0syo4duj4bgen8g%3d%3d"
            target="blank"
            className="text-gray-400 hover:text-primary-light transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-primary-light transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 bg-background-dark right-8 py-2 px-2 rounded-full text-white hover:text-primary-light  transition duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-base" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
