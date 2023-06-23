import { connectToDB } from "@/utils/utils";
import Product from "@/models/product";


export const GET = async (request, { params }) => {
  const { userId } = params;
console.log('ok')
  try {
    await connectToDB();

    const addedProducts = await Product.find({ creator: userId });


    const commentedProducts = await Product.find({
      "comments.creator.id": userId,
    });

    const likedProducts = await Product.find({ likes: userId });

    return new Response(
      JSON.stringify({ addedProducts, likedProducts, commentedProducts }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Failed to fetch products", { status: 500 });
  }
};
