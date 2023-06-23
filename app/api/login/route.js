import bcrypt from "bcrypt";
import { connectToDB } from "@/utils/utils";
import User from "@/models/user";
import { NextResponse } from "next/server";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
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
    const { email, password } = body;

    await connectToDB();

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.hashedPassword
      );

      if (!isPasswordCorrect) {
        return NextResponse.json({}, { status: 400 });
      }
      return NextResponse.json(existingUser);
    } else {
      return NextResponse.json(
        { message: "User with provided email does't exists." },
        { status: 404 }
      );
    }

  } catch (error) {
    console.log("Wystąpił błąd:", error);
    return NextResponse.json(
      { message: "A server error has occurred, try again later." },
      { status: 500 }
    );
  }
}
