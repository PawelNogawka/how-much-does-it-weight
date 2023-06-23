import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongdb is already connected");
    return true
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "food",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("Mongodb connected!");
  } catch (error) {
    console.log(error);
  }
};

export const countWomanBMR = (age, height, weight, activity) => {
  const result =
    655 + (9, 6 * weight) + (1, 8 * height) - (4, 7 * age) * activity;

  return result;
};


export const countManBMR = (age, height, weight, activity) => {
    const result =
     655 + (9,6 * weight) + (1,8 * height) - (4, 7 * age) * activity;
  
    return result;
  };


  export const countEnergy = (protein, fat, carbs) => {
    const energy = carbs * 4 + fat * 9 + protein * 4;
    return energy;
  };


  
const BASE_URL = 'https://edamam-recipe-search.p.rapidapi.com/search?q'


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.NEXT_EDEMAN_API_KEY,
		'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
	}
};


export const fetchApi = async (url, limit = 3) => {
  const modifiedUrl = `${url}&to=${limit}`; 
  const data = await fetch(`${BASE_URL}=${modifiedUrl}`, options);
  const result = await data.json();

  return result;
};
