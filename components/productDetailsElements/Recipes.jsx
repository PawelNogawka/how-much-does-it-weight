"use client";

import SectionHeading from "../uiElements/SectionHeading";
import Recipe from "./Recipe";

const Recipes = ({ recipes, user, productName }) => {
  return (
    <section id="recipes" className="recipes section-padding">
      <SectionHeading
        subtitle="recipes"
        title={`Explore recipes assigned with ${productName}`}
        desc={`find out what will give you eating ${productName} every day`}
      />

      <ul className="pin-list">
        {recipes.map((recipe) => (
          <Recipe key={recipe.recipe.label} recipe={recipe.recipe} user={user} />
        ))}
      </ul>
    </section>
  );
};

export default Recipes;
