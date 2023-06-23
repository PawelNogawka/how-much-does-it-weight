import { connectToDB } from "@/utils/utils";
import User from "@/models/user";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { productId, userId } = params;

  try {
    await connectToDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { addedProducts: productId },
    });

    await Product.findByIdAndUpdate(productId, { $pull: { likes: userId } });

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
