import React from "react";
import { AiFillCheckCircle } from "@react-icons/all-files/ai/AiFillCheckCircle";
import SectionHeading from "../uiElements/SectionHeading";
import "./WhyWe.scss";

const WhyWe = () => {
  const features = [
    {
      title: "User-Friendly Interface",
      description: "Enjoy a seamless and intuitive user experience.",
      icon: <AiFillCheckCircle />,
    },
    {
      title: "Extensive Food Database",
      description:
        "Access a vast collection of food products and their nutritional information.",
      icon: <AiFillCheckCircle />,
    },
    {
      title: "Personalized Recommendations",
      description:
        "Get tailored recommendations based on your dietary preferences and goals.",
      icon: <AiFillCheckCircle />,
    },
    {
      title: "Track Your Progress",
      description:
        "Monitor your weight, track your food intake, and stay motivated on your fitness journey.",
      icon: <AiFillCheckCircle />,
    },
  ];

  return (
    <section className="why-we section-padding">
      <SectionHeading
        center
        subtitle={"why we"}
        title="Why choose HMW"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no"
      />
      <ul className="why-we__container">
        {features.map((feature, index) => (
          <li key={index} className="why-we__box">
            <div className="why-we__box-left">{feature.icon}</div>
            <div className="why-we__box-right">
              <h3 className="why-we__box-title">{feature.title}</h3>
              <p className="why-we__box-desc">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyWe;
