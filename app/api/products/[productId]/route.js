import { connectToDB } from "@/utils/utils";
import Product from "@/models/product";
import User from "@/models/user";
import { NextResponse } from 'next/server';



export const GET = async (request, { params }) => {
  const { productId } = params;
  try {
    await connectToDB();

    const product = await Product.findById(productId)
      .populate('likes')

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const user = await User.findById(product.creator);
    product.creator = user;


    const latestProducts = await Product.find({ _id: { $ne: productId } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title image _id');

    const similarProducts = await Product.find({
      _id: { $ne: productId },
      category: product.category,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title image _id');

    return NextResponse.json(
      {
        product,
        latestProducts,
        similarProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('failed to fetch product:', error);
    return NextResponse.json({ message: 'Failed to fetch product' }, { status: 500 });
  }
};
