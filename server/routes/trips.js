const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const auth = require('../middleware/authMiddleware');

// Create a new trip
router.post('/', auth, async (req, res) => {
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
    res.status(500).json({ error: 'Failed to create trip' });
  }
});

// Get all trips for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }); 
    res.status(200).json(trips);
  } catch (error) {
    console.error("Failed to fetch trips:", error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

// Update a trip by ID
router.put('/:id', auth, async (req, res) => {
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
    console.error(error.stack);
    res.status(500).json({ error: 'Failed to update trip' });
  }
});

// Delete a trip by ID
router.delete('/:id', auth, async (req, res) => {
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
    res.status(500).json({ error: 'Failed to delete trip' });
  }
});

module.exports = router;
