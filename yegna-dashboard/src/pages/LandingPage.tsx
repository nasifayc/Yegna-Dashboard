import Home from "../components/landing/Home";
import NavBar from "../components/landing/NavBar";
import Service from "../components/landing/Service";
import Testimonies from "../components/landing/Testimonies";
import AboutUs from "../components/landing/AboutUs";
import Footer from "../components/landing/Footer";

const LandingPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <Home />
      <Service />
      <AboutUs />
      <Testimonies />
      <Footer />
    </>
  );
};

export default LandingPage;
