//models/Itinerary.js
const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  day: Number,
  activities: [{
    name: { type: String, required: true },  // replace description with name
    time: String,
    duration: Number
  }],          // human readable list
  attractions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attraction" }],
  image: String
});
const itinerarySchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',        
    required: true
  },
  title: { 
    type: String, 
    required: true },
  days: [daySchema],
  extraAttractions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Attraction" }
  ],
  activities: [
    {
      time: String,
      description: String
    }
  ],
  preferences: [String],
  notes: String
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
