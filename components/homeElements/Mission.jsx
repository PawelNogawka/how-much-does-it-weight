"use client";
import Image from "next/image";

import { FaLongArrowAltRight } from "@react-icons/all-files/fa/FaLongArrowAltRight";

import SectionHeading from "../uiElements/SectionHeading";
import Button from "../formElements/Button";

import "./Mission.scss";

const Mission = ({ setIsCreateOpen, setIsAuthOpen, user }) => {
  const handleCreateBtnClick = () => {
    if (user) {
      setIsCreateOpen(true);
    } else {
      setIsAuthOpen("login");
    }
  };

  return (
    <section className="mission section-padding">
      <div className="mission__left">
        <Image
          className="mission__left-background"
          src="/background.svg"
          alt="background"
          width={25}
          height={60}
        />
        <Image
          className="mission__left-hero"
          src="/mission.png"
          alt="background"
          width={280}
          height={400}
        />
      </div>
      <div className="mission__right">
        <SectionHeading
          title="Fuel Your Health with Nutritious Choices"
          subtitle="- our mission"
          desc="Discover a world of culinary delights with HowMuchItWeights. We're here to empower you to make informed choices about your food. Our app provides comprehensive information on the nutritional value and weight of various food products."
        />
        <div className="mission__counter">
          <div className="mission__counter-tile">
            <b className="mission__counter-tile-amount">800</b>
            <span className="mission__counter-tile-name">total users</span>
          </div>
          <div className="mission__counter-tile">
            <b className="mission__counter-tile-amount">867</b>
            <span className="mission__counter-tile-name">products</span>
          </div>
          <div className="mission__counter-tile">
            <b className="mission__counter-tile-amount">$ 1933,34</b>
            <span className="mission__counter-tile-name">total donation</span>
          </div>
        </div>
        <div className="mission__btns">
          <Button
            onClick={handleCreateBtnClick}
            secondary
            ariaLabel="Create pin"
          >
            create pin <FaLongArrowAltRight size={25} />
          </Button>
          <Button to="/search" dark ariaLabel="Search for food products">
            search pin
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Mission;
