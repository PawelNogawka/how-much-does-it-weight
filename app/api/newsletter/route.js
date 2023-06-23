import { connectToDB } from "@/utils/utils";
import Newsletter from "@/models/newsletter";
import { NextResponse } from "next/server";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email().required(),
});

export async function POST(request) {
  const body = await request.json();
  const { error, value } = schema.validate(body);
  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 }
    );
  }

  try {
    const { email } = body;

    await connectToDB();

    const existingEmail = await Newsletter.findOne({ email });

    if (existingEmail) {
    }

    const newEmail = new Newsletter({ email });
    await newEmail.save();

    return NextResponse.json({ message: "Email subscribed successfully." });
  } catch (error) {
    console.log("An error occurred:", error);
    return NextResponse.json(
      { message: "A server error has occurred, try again later." },
      { status: 500 }
    );
  }
}
