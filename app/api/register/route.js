import bcrypt from "bcrypt";
import { connectToDB, countManBMR, countWomanBMR } from "@/utils/utils";
import User from "@/models/user";
import { NextResponse } from "next/server";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  confirmedPassword: Joi.string().valid(Joi.ref("password")).required(),
  height: Joi.number().min(70).max(250).required(),
  weight: Joi.number().min(30).max(300).required(),
  age: Joi.number().min(8).max(115).required(),
  activity: Joi.number().min(1).max(2).required(),
  gender: Joi.string(),
  photo: Joi.string().allow('')
});

export async function POST(request) {
  const body =  await request.json();
  const { error, value } = schema.validate(body);
  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 }
    );
  }

  try {
    const { name, email, password, age, gender, weight, height, activity, photo } = body

    await connectToDB();

    let bmr = null;

    if (gender == "female") {
      bmr = countWomanBMR(age, height, weight, activity);
    } else {
      bmr = countManBMR(age, height, weight, activity);
    }


    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with given email address already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username: name,
      email: email,
      hashedPassword: hashedPassword,
      image:photo,
      bmr,
      basicInfo: {
        height,
        weight,
        age,
        activity,
      },
    });

    const createdUser = await newUser.save();

    return NextResponse.json(createdUser);
  } catch (error) {
    console.log("Wystąpił błąd:", error);
    return NextResponse.json(
      { message: "A server error has occurred, try again later." },
      { status: 500 }
    );
  }
}
