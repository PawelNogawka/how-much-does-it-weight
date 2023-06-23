"use client";
import Link from "next/link";

import "./CategoryBox.scss";

const CategoryBox = ({ icon, category }) => {
  return (
    <Link
      href={`/search?category=${category}`}
      aria-label={`Go to ${category} category`}
      className="category-box"
    >
      {icon}
      <p className="category-box__name">{category}</p>
    </Link>
  );
};

export default CategoryBox;
