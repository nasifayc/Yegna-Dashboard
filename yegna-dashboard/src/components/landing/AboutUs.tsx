import { motion } from "framer-motion";
import aboutUsImg from "../../assets/landing/aboutUs.png";
import { FaArrowRight } from "react-icons/fa";

const AboutUs: React.FC = () => {
  return (
    <section
      id="about-us"
      className="h-screen relative flex items-center justify-center bg-cover bg-center bg-background-dark"
      style={{
        backgroundImage: `url(${aboutUsImg})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      <div className="relative  max-w-3xl text-center px-6 flex  flex-col justify-center items-center">
        <motion.h1
          className="text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          About Us
        </motion.h1>

        <motion.p
          className="text-lg text-gray-200 leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Welcome to our organization! We are dedicated to delivering the best
          services to our clients, fostering innovation, and creating a
          collaborative environment for growth and success.
        </motion.p>

        <motion.button
          className="mt-8 px-6 py-3  flex justify-center items-center text-white rounded-full border-2 border-white hover:border-primary-light  hover:text-primary-light transition duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Learn More
          <FaArrowRight className="ml-3" />
        </motion.button>
      </div>
    </section>
  );
};

export default AboutUs;
