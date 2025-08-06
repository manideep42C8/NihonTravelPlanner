const mongoose = require('mongoose');

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
  day: {
    type: Number,
    required: true
  },
  activities: [
    {
      time: String,
      description: String
    }
  ],
  notes: String
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
