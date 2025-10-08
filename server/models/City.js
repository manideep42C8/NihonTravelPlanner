//models/City.js
const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  country: { type: String, default: "Japan" },
  lat: Number,
  lng: Number,
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model("City", citySchema);
