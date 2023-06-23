import SearchPage from "@/components/searchPage/SearchPage";
import EmptyList from "@/components/uiElements/EmptyList";
import { fetchData } from "@/utils/utils";

async function fetchData(category, search) {
  try {
    const res = await fetch(
      `https://how-much-does-it-weight.vercel.app/api/products/search/${category}/${search}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }


    return res.json();
  } catch (error) {
    return error;
  }
}

export async function generateMetadata({ searchParams }) {
  const category = searchParams.category || "all";
  const search = searchParams.search || "";

  if (search) {
    return {
      title: `Search results by ${search}`,
      description: "",
    };
  }

  return {
    title: `Search results by ${category}`,
    description: "",
  };
}

export default async function SearchPageMain({ searchParams }) {
  const category = searchParams.category || "all";
  const search = searchParams.search || "";

  const data = await fetchData(category, search);
  if (data?.message || !data) return <EmptyList title={data.message} />;


  return (
    <main className="main">
      <SearchPage
        products={data}
        searchQuery={search}
        categoryQuery={category}
      />
    </main>
  );
}
