import React from "react";

import { categories } from "@/data/categories";

import SectionHeading from "../uiElements/SectionHeading";
import CategoryBox from "./CategoryBox";

import "./Categories.scss";

const Categories = () => {
  return (
    <section id="categories" className="categories section-padding">
      <SectionHeading
        center
        subtitle={"categories"}
        title="Explore categories"
        desc="Immerse yourself in a wide range of categories and uncover the hidden treasures of flavors and ingredients."
      />
      <ul className="categories__container">
        {categories.map((category) => (
          <li key={category.name}>
            <CategoryBox icon={category.icon} category={category.name} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
