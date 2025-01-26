import heroImg from "../../assets/landing/hero-img.png";
import { FaArrowRight } from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <section
      id="home"
      className="h-screen px-24 pt-36 flex items-center justify-between bg-background-dark"
    >
      <div className="max-w-lg">
        <h1 className="text-7xl font-bold text-text-dark">
          Connect, Shop, And Prosper
        </h1>
        <p className="text-text-dark mt-4">
          Connecting Ethiopian buyers and sellers with ease, trust, and
          convenience.
        </p>
        <button className="mt-8 px-6 py-3 border-white border-2 flex justify-center items-center text-white rounded-full hover:bg-primary-light transition">
          Get Started
          <FaArrowRight className="ml-3" />
        </button>
      </div>
      <img src={heroImg} alt="Cart_Image" className="w-1/2 h-auto" />
    </section>
  );
};

export default Home;
