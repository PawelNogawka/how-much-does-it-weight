import UserPage from "@/components/userPageElements/UserPage";
import EmptyList from "@/components/uiElements/EmptyList";

async function fetchData(userId) {
  try {
    const res = await fetch(
      `https://how-much-does-it-weight.vercel.app/api/products/userProducts/${userId}`,
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

export const metadata = {
  title: "Your profile page",
  description: "Explore products that you have added liked and commented.",
};

export default async function UserPageMain({ params }) {
  const { userId } = params;

  const data = await fetchData(userId);

  if (data?.message || !data) return <EmptyList title={data.message} />;

  return (
    <UserPage
      addedProducts={data.addedProducts}
      likedProducts={data.likedProducts}
      commentedProducts={data.commentedProducts}
    />
  );
}
