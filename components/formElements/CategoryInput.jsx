import React from "react";

import "./CategoryInput.scss";

const CategoryInput = ({ category, description, icon, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${"category-input"} ${
        selected && "category-input--selected"
      }`}
      aria-label={`Select ${category} category`}
    >
      <div className="category-input__left">{icon}</div>
      <div className="category-input__right">
        <h3 className="category-input__name">{category}</h3>
        <p className="category-input__desc">{description}</p>
      </div>
    </button>
  );
};

export default CategoryInput;
