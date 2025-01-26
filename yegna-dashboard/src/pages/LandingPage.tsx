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
      <div className="pt-16">
        <Home />
        <Service />
        <Testimonies />
        <AboutUs />
        <SignIn />
      </div>
    </>
  );
}

export default LandingPage;
