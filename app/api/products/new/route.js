import { connectToDB, countEnergy } from "@/utils/utils";
import { NextResponse } from "next/server";
import Joi from "joi";

import Product from "@/models/product";


const schema = Joi.object({
  creator: Joi.string().required(),
   name: Joi.string().required(),
  category: Joi.string().required(),
  image: Joi.object({
    photo: Joi.string().required(),
    amount: Joi.number().required(),
  }),
  title: Joi.string().required(),
  description: Joi.string().required(),
  nutrition: Joi.object({
    standard: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().required(),
        unit: Joi.string().required(),
      })
    ),
    photoWeight: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().required(),
        unit: Joi.string().required(),
      })
    ),
  }),
  vitamins: Joi.object({
    standard: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().required(),
        unit: Joi.string().required(),
      })
    ),
    photoWeight: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().required(),
        unit: Joi.string().required(),
      })
    ),
  }),
  minerals: Joi.object({
    standard: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().required(),
        unit: Joi.string().required(),
      })
    ),
    photoWeight: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        amount: Joi.number().required(),
        unit: Joi.string().required(),
      })
    ),
  }),
  healthFeatures: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().min(5).required(),
        desc: Joi.string().min(20).required(),
      })
    )
    .min(1)
    .required(),
});

export async function POST(request) {
  const body = await request.json();

  const { error } = schema.validate(body);
  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 }
    );
  }

  const {
    vitamins,
    minerals,
    nutrition,
    title,
    name,
    description,
    category,
    image,
    creator,
    healthFeatures
  } = body;


  const photoWeightAmounts = nutrition.photoWeight.map((item) => item.amount);
  const standardAmounts = nutrition.standard.map((item) => item.amount);

  const photoEnergy = countEnergy(...photoWeightAmounts);
  const standardEnergy = countEnergy(...standardAmounts);

  try {
    await connectToDB();

    const newProduct = new Product({
      creator,
      title,
      name,
      category,
      description,
      image,
      healthFeatures,
      nutrition: {
        standard: [
          {
            name: "energy",
            amount: standardEnergy,
            unit: "kcl",
          },
          ...nutrition.standard,
        ],
        photoWeight: [
          {
            name: "energy",
            amount: photoEnergy,
            unit: "kcl",
          },
          ...nutrition.photoWeight,
        ],
      },
      vitamins,
      minerals,
      standardEnergy: {
        amount: standardEnergy,
        unit: "kcl",
      },
      photoEnergy: {
        amount: photoEnergy,
        unit: "kcl",
      },
      comments: [],
      likes: [],
    });
    const createdProduct = await newProduct.save();

    return NextResponse.json(createdProduct);
  } catch (error) {
    console.log("Wystąpił błąd:", error);
    return NextResponse.json(
      { message: "A server error has occurred, try again later." },
      { status: 500 }
    );
  }
}
