import React from "react";
import profile1 from "../../assets/landing/profile1.jpg";
import profile2 from "../../assets/landing/profile2.jpg";
import profile3 from "../../assets/landing/profile3.jpg";

const testimonies = [
  {
    name: "John Doe",
    title: "CEO, XYZ Corp.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut imperdiet nisi, non commodo massa.",
    image: profile1,
  },
  {
    name: "Jane Smith",
    title: "CTO, ABC Solutions",
    text: "Working with this team was a game-changer for our business. Their dedication, creativity, and professionalism exceeded all expectations.",
    image: profile2,
  },
  {
    name: "Michael Brown",
    title: "Founder, Bright Tech",
    text: "Their expertise in solving complex problems is unmatched. They delivered outstanding results on time and within budget.",
    image: profile3,
  },
  {
    name: "Emily Davis",
    title: "Marketing Manager, Global Ventures",
    text: "Fantastic experience from start to finish! Their team went above and beyond to ensure our project was a success.",
    image: profile1,
  },
  {
    name: "Chris Wilson",
    title: "COO, NextGen Enterprises",
    text: "Exceptional service and outstanding results. They truly understand the client’s needs and work tirelessly to meet them.",
    image: profile2,
  },
  {
    name: "Sophia Taylor",
    title: "Head of Design, Creative Minds",
    text: "An incredible team to work with! Their creativity and technical know-how are top-notch. Highly recommended!",
    image: profile3,
  },
];

const Testimonies: React.FC = () => {
  return (
    <section
      id="testimonies"
      className="h-screen py-20 px-8 bg-background-light"
    >
      <h1 className="text-4xl py-10 text-text-light font-bold text-center mb-16">
        Testimonies
      </h1>
      <div className="relative overflow-hidden">
        <div className="flex gap-8 animate-marquee py-5">
          {testimonies.map((testimony, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[350px] bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <img
                src={testimony.image}
                alt={testimony.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
              />
              <h2 className="text-lg font-semibold text-primary-light text-center">
                {testimony.name}
              </h2>
              <p className="text-sm text-gray-600 text-center">
                {testimony.title}
              </p>
              <p className="text-gray-700 text-sm mt-4 text-center">
                "{testimony.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-marquee {
            display: flex;
            will-change: transform;
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Testimonies;
