import React from "react";

import { AiFillCheckCircle } from "@react-icons/all-files/ai/AiFillCheckCircle";

import SectionHeading from "../uiElements/SectionHeading";
import FeatureBox from "../sharedElements/FeatureBox";

import "./Health.scss";

const Health = ({ healthFeatures, productName }) => {
  return (
    <section id="health" className="health section-padding">
      <SectionHeading
        center
        subtitle="health"
        title={`What is a healthy ${productName} for?`}
        desc={`find out what will give you eating ${productName} every day`}
      />

      <ul className="health__list">
        {healthFeatures.map((feature) => (
          <FeatureBox
            key={feature.title}
            icon={<AiFillCheckCircle />}
            desc={feature.desc}
            title={feature.title}
          />
        ))}
      </ul>
    </section>
  );
};

export default Health;
