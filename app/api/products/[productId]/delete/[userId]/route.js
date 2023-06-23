import { connectToDB } from "@/utils/utils";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const { productId, userId } = params;


  try {
    await connectToDB();

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    if (product.creator.toString() !== userId) {
      return NextResponse.json(
        {
          message: "Unauthorized: You do not have permission to delete this product",
        },
        { status: 401 }
      );
    }

    const result = await Product.deleteOne({ _id: productId, creator: userId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to delete product:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
};
