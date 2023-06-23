import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
  },
  healthFeatures: [
    {
      title: {
        type: String,
      },
      desc: {
        type: String,
      },
    },
  ],

  image: {
    photo: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  photoEnergy: {
    amount: {
      type: Number,
    },
    unit: {
      type: String,
    },
  },
  standardEnergy: {
    amount: {
      type: Number,
    },
    unit: {
      type: String,
    },
  },
  nutrition: {
    standard: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
    photoWeight: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
  },
  vitamins: {
    standard: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
    photoWeight: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
  },
  minerals: {
    standard: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
    photoWeight: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
  },

  comments: [
    {
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      creator: {
        id: { type: Schema.Types.ObjectId, ref: "User", default: null },
        name: { type: String },
        email: { type: String },
      },
      rate: {
        type: Number,
      },
      replies: [
        {
          text: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
          creator: {
            name: {
              type: String,
            },
            email: {
              type: String,
            },
          },
        },
      ],
      default: [],
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
