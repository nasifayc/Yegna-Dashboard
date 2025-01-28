import React from "react";
import heroImg from "../../assets/landing/hero-img.png";
import { FaArrowRight } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";

const Home: React.FC = () => {
  const { setShowSignIn } = useModal();

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  return (
    <section
      id="home"
      className="h-screen px-24 pt-36 flex items-center justify-between bg-background-dark"
    >
      <div className="max-w-lg">
        <h1 className="text-7xl font-bold text-text-dark">
          Connect, <span className="text-primary-light">Shop</span>, And Prosper
        </h1>
        <p className="text-text-dark mt-4">
          Connecting Ethiopian buyers and sellers with ease, trust, and
          convenience.
        </p>
        <button
          onClick={handleSignInClick}
          className="mt-8 px-6 py-3 border-white border-2 flex justify-center items-center text-white hover:text-primary-light rounded-full hover:border-primary-light transition duration-300"
        >
          Get Started
          <FaArrowRight className="ml-3" />
        </button>
      </div>
      <img src={heroImg} alt="Cart_Image" className="w-1/2 h-auto" />
    </section>
  );
};

export default Home;
