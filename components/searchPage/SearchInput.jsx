"use client";

import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";

import { categories } from "@/data/categories";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";

import "./SearchInput.scss";

const SearchInput = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    let updatedQuery = {
      ...currentQuery,
      category: selectedCategory.toLowerCase(),
    };

    if (search) {
      updatedQuery.search = search.toLowerCase();
    } else {
      if (params?.get("search")) {
        delete updatedQuery.search;
      }
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
    <form onSubmit={handleFormSubmit} className="search-input">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        placeholder="All catgories"
        className="serch-input__select"
      >
        <>
          <option value="all" selected>
            all categories
          </option>
          {categories.map((category) => (
            <option
              key={category.name}
              value={category.name}
              className="search-input__option"
            >
              {category.name}
            </option>
          ))}
        </>
      </select>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        aria-label="Search pins"
        placeholder="Search pins..."
      />
      <button type="submit" aria-label="Confirm form">
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default SearchInput;
