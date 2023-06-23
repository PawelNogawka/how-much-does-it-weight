"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";

import { categories } from "@/data/categories";

import Button from "../formElements/Button";

import "./CategoryWidget.scss";

const CategoryWidget = ({ selectedCategory, setSelectedCategory }) => {
  const [isEqual, setIsEqual] = useState(false);

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    if (currentQuery.category == selectedCategory) {
      setIsEqual(true);
    } else {
      setIsEqual(false);
    }
  }, [selectedCategory, setSelectedCategory, params]);

  const hanldeFormSubmit = (e) => {
    e.preventDefault();

    if (selectedCategory == "") return;

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      category: selectedCategory.toLowerCase(),
    };

    if (params?.get("category") == selectedCategory) {
      delete updatedQuery.category;
    }

    if (params?.get("search")) {
      delete updatedQuery.search;
    }

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <form onSubmit={hanldeFormSubmit} className="category-widget">
      <h4 className="category-widget__heading">categories</h4>
      <ul className="categoty-widget__list">
        <li>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`${"category-widget__btn"} ${
              "all" === selectedCategory ? "category-widget__btn--active" : ""
            }`}
          >
            all products
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.name}>
            <button
              type="button"
              onClick={() => setSelectedCategory(category.name)}
              aria-label={`Filter by ${category.name} category`}
              className={`${"category-widget__btn"} ${
                category.name === selectedCategory
                  ? "category-widget__btn--active"
                  : ""
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
      <Button
        type="submit"
        disabled={!selectedCategory || isEqual}
        ariaLabel={`Filter by `}
        className="category-widget__submit-btn"
      >
        search
      </Button>
    </form>
  );
};

export default CategoryWidget;
