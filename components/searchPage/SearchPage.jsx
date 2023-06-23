"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";

import Wrapper from "../uiElements/Wrapper";
import SectionHeading from "../uiElements/SectionHeading";
import CategoryWidget from "./CategoryWidget";
import SearchInput from "./SearchInput";
import PinList from "../pinElements/PinList";
import EmptyList from "../uiElements/EmptyList";

import "./SearchPage.scss";

const SearchPage = ({ products, searchQuery, categoryQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  console.log(products);
  const router = useRouter();
  const params = useSearchParams();
  const pinListRef = useRef(null);

  useEffect(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    if (currentQuery.category) {
      setSelectedCategory(currentQuery.category);
    }
  }, [router, params]);

  useEffect(() => {
    if (pinListRef.current && window.innerWidth < 700) {
      pinListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchQuery, categoryQuery]);

  let sortedProducts = [...products];

  if (sortOrder === "newest") {
    sortedProducts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } else if (sortOrder === "oldest") {
    sortedProducts.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  return (
    <section className="search-page">
      <div className="search-page__header">
        <div className="search-page__header-container">
          <h1 className="search-page__heading">
            Let’s find the food products that interest you
          </h1>
          <SearchInput
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </div>
      <Wrapper>
        <div className="search-page__container">
          <div className="search-page__left">
            <h3 className="search-page__title">Filter by categories</h3>
            <CategoryWidget
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="search-page__right">
            {searchQuery && (
              <SectionHeading
                title={`Search result by '${searchQuery}' in '${categoryQuery}'`}
              />
            )}
            {!searchQuery && (
              <SectionHeading
                title={`Search result by '${categoryQuery}' category`}
              />
            )}
            <div className="search-page__info">
              {products.length > 0 && (
                <b className="search-page__amount">
                  {products.length} products found
                </b>
              )}
              {sortedProducts.length > 0 && (
                <div className="search-page__filter">
                  <button
                    className={`search-page__filter-btn ${
                      sortOrder === "newest" &&
                      "search-page__filter-btn--active"
                    }`}
                    onClick={() => setSortOrder("newest")}
                  >
                    newest
                  </button>
                  <button
                    className={`search-page__filter-btn ${
                      sortOrder === "oldest" &&
                      "search-page__filter-btn--active"
                    }`}
                    onClick={() => setSortOrder("oldest")}
                  >
                    oldest
                  </button>
                </div>
              )}
            </div>
            {sortedProducts.length > 0 && (
              <>
                <div ref={pinListRef}>
                  <PinList pins={sortedProducts} />
                </div>
              </>
            )}
            {sortedProducts.length <= 0 && (
              <span className="search-page__no-result">{`No resluts for '${searchQuery || categoryQuery}'`}</span>
            )}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default SearchPage;
