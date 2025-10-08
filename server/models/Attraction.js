//Attraction.js
const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema({
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  name: { type: String, required: true },
  category: { type: String, required: true }, // culture, food, shopping...
  description: String,
  open: { type: String, default: "09:00" },   // "HH:MM"
  close: { type: String, default: "17:00" },
  duration: { type: Number, default: 60 },     // minutes
  area: String,
  lat: Number,
  lng: Number,
  entryFee: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  tags: [String],
  images: [String],
}, { timestamps: true });

// optional compound index: prevent duplicate name inside same city
attractionSchema.index({ city: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Attraction", attractionSchema);
