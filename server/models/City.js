import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  country: { type: String, default: "Japan" },
  // optional: coordinates, images, tags
  lat: Number,
  lng: Number,
  images: [String],
}, { timestamps: true });

export default mongoose.model("City", citySchema);