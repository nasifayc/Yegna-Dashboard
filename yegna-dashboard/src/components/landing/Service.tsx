import React from "react";
import { motion } from "framer-motion";
import service1Img from "../../assets/landing/service1.png";
import service2Img from "../../assets/landing/service2.png";
import service3Img from "../../assets/landing/service3.png";

const services = [
  {
    id: 1,
    title: "Secure Payment",
    description:
      "Enjoy peace of mind with our secure payment options. We use advanced encryption and trusted payment gateways to ensure that your transactions are fast, reliable, and completely secure. Shop with confidence, knowing your financial data is always protected.",
    image: service1Img,
  },
  {
    id: 2,
    title: "Fast Delivery",
    description:
      "We pride ourselves on providing quick and reliable delivery services. No matter where you are, our logistics team works around the clock to ensure your orders reach you in the shortest time possible, with real-time tracking for added convenience.",
    image: service2Img,
  },
  {
    id: 3,
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is available 24/7 to assist you with any inquiries or issues. Whether you need help placing an order, tracking a shipment, or resolving a problem, we're just a message or call away, ready to provide the best service.",
    image: service3Img,
  },
  {
    id: 4,
    title: "Product Customization",
    description:
      "Make every product uniquely yours with our customization services. Whether it's engraving, special packaging, or tailored designs, we ensure that your preferences are met. Add a personal touch to your purchases effortlessly.",
    image: service2Img,
  },
];

const Service: React.FC = () => {
  return (
    <section id="service" className="py-20 px-24 bg-background-dark">
      <h1 className="text-4xl py-10 text-text-dark font-bold text-center mb-16">
        Our Services
      </h1>
      <div className="space-y-20 px-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className={`flex flex-col lg:flex-row ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            } items-center gap-8`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full lg:w-1/2 rounded-lg shadow-md object-cover"
            />
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-2xl text-text-dark font-semibold mb-4">
                {service.title}
              </h2>
              <p className="text-gray-400">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Service;
