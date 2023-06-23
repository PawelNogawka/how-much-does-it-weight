import { connectToDB } from "@/utils/utils";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const body = await request.json();

  const { productId } = params;
  const { userId } = body;

  try {
    await connectToDB();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    product.likes.push(userId);
    await product.save();

    return NextResponse.json(
      { message: "User's addedProducts and Product's likes updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error updating user's addedProducts and product's likes:",
      error
    );
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
