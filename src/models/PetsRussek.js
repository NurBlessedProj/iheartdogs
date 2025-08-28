import mongoose from "mongoose";

const PetsRusselSchema = new mongoose.Schema(
  {
    breed: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    sex: {
      type: String,
      required: false,
    },
    age: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const PetsRussel = mongoose.models.PetsRussel || mongoose.model("PetsRussel", PetsRusselSchema);
export default PetsRussel;
