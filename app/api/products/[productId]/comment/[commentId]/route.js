import { connectToDB } from "@/utils/utils";

import Product from "@/models/product";
import { NextResponse } from "next/server";
import Joi from "joi";

const commentSchema = Joi.object({
  text: Joi.string().required(),
  date: Joi.date().required(),
  creator: Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }).required(),
});

export async function POST(request, { params }) {
  const { commentId, productId } = params;
  const body = await request.json();

  const { error, value } = commentSchema.validate(body);
  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 }
    );
  }

  await connectToDB();

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const comment = product.comments.find(
      (c) => c._id.toString() === commentId
    );
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    const name = body.creator.name;
    const id = body.creator.id;
    const email = body.creator.email;

    const newReply = {
      text: body.text,
      date: body.date,
      creator: {
        email: email,
        id,
        name,
      },
    };

    comment.replies.push(newReply);

    await product.save();

    return NextResponse.json(
      { message: "Reply added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding reply:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
