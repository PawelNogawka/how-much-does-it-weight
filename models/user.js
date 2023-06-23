import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "User already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  hashedPassword:{
    type:String,
  },
  image: {
    type: String,
    default:null,
  },
  bmr:{
    type:Number
  },
  basicInfo: {
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },
    activity: {
      type: Number,
    },
  },
});

const User = models.User || model("User", UserSchema);

export default User;
