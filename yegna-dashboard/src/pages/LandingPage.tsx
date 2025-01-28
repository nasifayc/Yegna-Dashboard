import Home from "../components/landing/Home";
import NavBar from "../components/landing/NavBar";
import Service from "../components/landing/Service";
import Testimonies from "../components/landing/Testimonies";
import AboutUs from "../components/landing/AboutUs";
import Footer from "../components/landing/Footer";
import { ModalProvider } from "../context/ModalContext";
import SignInPage from "../components/SignIn";
import { ToastContainer } from "react-toastify";

const LandingPage: React.FC = () => {
  return (
    <ModalProvider>
      <NavBar />
      <Home />
      <Service />
      <AboutUs />
      <Testimonies />
      <Footer />
      <SignInPage />
      <ToastContainer />
    </ModalProvider>
  );
};

export default LandingPage;
