import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    id: {
      type: String,
      required: true,
    },
    name: String,
    required: true,
  },
  products: [
    {
      id: {
        typer: Number,
        required: true,
      },
      name: {
        typer: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    required: true,
  },
},
  timestampes: true,
);

export default mongoose.model('Order', OrderSchema);