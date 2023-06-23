import React from "react";
import Image from "next/image";

import { AiFillCheckCircle } from "@react-icons/all-files/ai/AiFillCheckCircle";

import SectionHeading from "../uiElements/SectionHeading";

import "./About.scss";

const About = () => {
  return (
    <section className="about section-padding">
      <div className="about__left">
        <SectionHeading
          subtitle="who we are"
          title="Empowering Your Food Journey"
          desc="At HowMuchItWeights, we are passionate about empowering individuals to make informed choices about their food. With over 25 years of experience in the field of nutrition and crowdfunding, we have dedicated ourselves to creating a platform that enhances your food journey and promotes a healthier lifestyle."
        />
        <div className="about__info">
          <div className="about__info-tile">
            <div className="about__info-tile-circle">
              <AiFillCheckCircle size={30} />
            </div>
            <div className="about__info-tile-right">
              <h3 className="about__info-tile-title">
                Comprehensive Food Data
              </h3>
              <p className="about__info-tile-desc">
                Our app provides detailed information on the nutritional
                composition and weight of a wide range of food products, giving
                you the knowledge you need to make healthier choices.
              </p>
            </div>
          </div>
          <div className="about__info-tile">
            <div className="about__info-tile-circle">
              <AiFillCheckCircle size={30} />
            </div>
            <div className="about__info-tile-right">
              <h3 className="about__info-tile-title">
                Personalized Recommendations
              </h3>
              <p className="about__info-tile-desc">
                We offer personalized recommendations based on your dietary
                preferences and goals, helping you tailor your food choices to
                meet your specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="about__right">
        <Image
          className="about__right-background"
          src="/background.svg"
          alt="background"
          width={25}
          height={60}
        />
        <Image
          className="about__right-hero"
          src="/weare.png"
          alt="background"
          width={280}
          height={400}
        />
      </div>
    </section>
  );
};

export default About;
