const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const auth = require('../middleware/authMiddleware');
const { tripValidation } = require('../validators/tripValidator');
const validate = require('../middleware/validate');

// Create a new trip with validation
router.post('/', auth, tripValidation, validate, async (req, res, next) => {
  try {
    const trip = new Trip({
      user: req.user.id,
      title: req.body.title,
      destination: req.body.destination,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      notes: req.body.notes
    });

    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    console.error("Trip creation error:", error);
    next(error);
  }
});

// Get all trips for the logged-in user (no validation needed here)
router.get('/', auth, async (req, res, next) => {
  try {
    const trips = await Trip.find({ user: req.user.id }); 
    res.status(200).json(trips);
  } catch (error) {
    console.error("Failed to fetch trips:", error);
    next(error);
  }
});

// Update a trip by ID with validation
router.put('/:id', auth, tripValidation, validate, async (req, res, next) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error("Trip update error:", error);
    next(error);
  }
});

// Delete a trip by ID (no validation needed here)
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const deletedTrip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deletedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error("Trip deletion error:", error);
    next(error);
  }
});

module.exports = router;
