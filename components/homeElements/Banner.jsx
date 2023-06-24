"use client";
import Image from "next/image";

import { FaLongArrowAltRight } from "@react-icons/all-files/fa/FaLongArrowAltRight";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";

import Button from "../formElements/Button";

import "./Banner.scss";

const Banner = ({ setIsCreateOpen, setIsAuthOpen, user }) => {
  const handleCreateBtnClick = () => {
    if (user) {
      setIsCreateOpen(true);
    } else {
      setIsAuthOpen("login");
    }
  };

  return (
    <section className="banner">
      <div className="banner__left">
        <div className="banner__header">
          <span className="banner__header-subtitle">- howmuchdoesitweight</span>
          <h1 className="banner__header-heading">
            <span className="banner__header-heading-bold">
              discower the weight
            </span>
            of Your Favorite Food Products
          </h1>
          <p className="banner__header-desc">
            Simplify Your Meal Planning and Portion Control Efforts with
            Accurate Food Weight Information and Nutritional Insights
          </p>
          <div className="banner__header-btns">
            <Button to="/#categories" secondary ariaLabel="learn more">
              learn more <FaLongArrowAltRight size={20} />
            </Button>
            <Button onClick={handleCreateBtnClick} dark ariaLabel="create pin">
              create pin <FaPlus />
            </Button>
          </div>
        </div>
        <Image
          className="banner__partners"
          src="/partners.jpg"
          alt="partners"
          width={300}
          height={100}
        />
      </div>
      <div className="banner__right">
        <Image
          className="banner__right-background"
          src="hero.svg"
          alt="background"
          width={300}
          height={300}
        />
        <Image
          className="banner__right-hero"
          src="/hero.png"
          alt="background"
          width={340}
          height={400}
        />
      </div>
    </section>
  );
};

export default Banner;
