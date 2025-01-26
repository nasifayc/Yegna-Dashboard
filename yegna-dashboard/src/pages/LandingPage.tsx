import Home from "../components/landing/Home";
import NavBar from "../components/landing/NavBar";
import Service from "../components/landing/Service";
import Testimonies from "../components/landing/Testimonies";
import AboutUs from "../components/landing/AboutUs";
import SignIn from "../components/landing/SignIn";

function LandingPage() {
  return (
    <>
      <NavBar />

      <Home />
      <Service />
      <Testimonies />
      <AboutUs />
      <SignIn />
    </>
  );
}

export default LandingPage;
