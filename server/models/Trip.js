//models/Trips.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  days: [
    {
      day: { type: Number, required: true },
      activities: [
        {
          name: { type: String, required: true }, // attraction name
          time: { type: String, default: "" },    // planned time
          duration: { type: Number, default: 60 } // minutes
        }
      ],
      // free-text like “Visit Tokyo Tower”
      attractions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attraction" }], // link real attractions
      image: { type: String } // optional image per day
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trip', tripSchema);
