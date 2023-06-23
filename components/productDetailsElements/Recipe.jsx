"use client";
import React from "react";
import Link from "next/link";

import { AiOutlineFieldTime } from "@react-icons/all-files/ai/AiOutlineFieldTime";
import { ImUsers } from "@react-icons/all-files/im/ImUsers";

import Diagram from "../sharedElements/Diagram";

import "./Recipe.scss";

const Recipe = ({ recipe, user }) => {
  const { image, label, yield: portion, totalTime, calories, shareAs } = recipe;

  const energy = calories / portion;
  return (
    <li className="recipe">
      <Link
        href={shareAs}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="See recipe details"
      >
        <img src={image} alt={label} width={300} height={200} />

        <div className="recipe__bottom">
          <h3 className="recipe__title">{label}</h3>
          <Diagram energy={energy} userBmr={user?.bmr} />
          <div className="recipe__info">
            <div className="recipe__info-box">
              <AiOutlineFieldTime size={22} />
              <span>{`${totalTime} min`}</span>
            </div>
            <div className="recipe__info-box">
              <ImUsers size={20} />
              <span>{`for ${portion} people`}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Recipe;
