import { Schema, model, models } from "mongoose";

const NewsletterSchema = new Schema({
  email: {
    type: String,
    unique: [true, "User already exists!"],
    required: [true, "Email is required!"],
  },
});

const Newsletter = models.Newsletter || model("Newsletter", NewsletterSchema);

export default Newsletter;
