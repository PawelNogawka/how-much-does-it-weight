import ProductDetails from "@/components/productDetailsElements/ProductDetails";
import EmptyList from "@/components/uiElements/EmptyList";
import { fetchApi } from "@/utils/utils";

async function fetchData(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    return error;
  }
}

export async function generateMetadata({ params }) {
  const data = await fetchData(params.productId);
  return {
    title: data?.product?.title || "Howmuchitweights",
    description: data?.product?.description || "Howmuchitweights",
  };
}

const ProductPage = async ({ params }) => {
  const data = await fetchData(params.productId);

  if (data?.message || !data) return <EmptyList title={data.message} />;

  const recipes = await fetchApi(data?.product.name);

  return (
    <ProductDetails
      product={data.product}
      latestProducts={data.latestProducts}
      similarProducts={data.similarProducts}
      recipes={recipes.hits}
    />
  );
};

export default ProductPage;
