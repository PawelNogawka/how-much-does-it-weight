import React from "react";
import { FaEgg } from "@react-icons/all-files/fa/FaEgg";
import { GiAvocado } from "@react-icons/all-files/gi/GiAvocado";
import { GiWrappedSweet } from "@react-icons/all-files/gi/GiWrappedSweet";
import { AiFillThunderbolt } from "@react-icons/all-files/ai/AiFillThunderbolt";
import { GiSaltShaker } from "@react-icons/all-files/gi/GiSaltShaker";
import { GiKiwiFruit } from "@react-icons/all-files/gi/GiKiwiFruit";

import "./Ingredients.scss";

const Ingredients = ({ title, nutrition, small }) => {
  const renderIngredientTile = (name, amount, unit, Icon) => {
    if (small && (name === "salt" || name === "fiber")) {
      return null;
    }

    const formattedAmount = Number.isInteger(amount)
      ? amount.toFixed(0)
      : amount.toFixed(2);

    return (
      <div key={name} className="ingredients__tile">
        <Icon />
        <span className="ingredients__amount">
          {formattedAmount} {unit}
        </span>
        {name !== "energy" && (
          <span className="ingredients__name">{name}</span>
        )}
      </div>
    );
  };

  return (
    <div className="ingredients">
      <h3 className="ingredients__title">{title}</h3>
      <div className="ingredients__list">
        {nutrition.map(({ name, amount, unit }) => {
          switch (name) {
            case "protein":
              return renderIngredientTile(name, amount, unit, FaEgg);
            case "fat":
              return renderIngredientTile(name, amount, unit, GiAvocado);
            case "carbs":
              return renderIngredientTile(name, amount, unit, GiWrappedSweet);
            case "energy":
              return renderIngredientTile(name, amount, unit, AiFillThunderbolt);
            case "salt":
              return renderIngredientTile(name, amount, unit, GiSaltShaker);
            case "fiber":
              return renderIngredientTile(name, amount, unit, GiKiwiFruit);
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default Ingredients;
