import React from "react";

import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";

import Button from "../formElements/Button";

import "./DonateWidget.scss";

const DonateWidget = () => {
  return (
    <div className="donate-widget">
      <h3 className="donate-widget__title">Donate to World Cancer Society</h3>
      <p className="donate-widget__info">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nemo Lorem
        ipsum dolor sit amet.
      </p>
      <Button secondary ariaLabel="Donate">
        Donate now <AiFillHeart size={20} />
      </Button>
    </div>
  );
};

export default DonateWidget;
