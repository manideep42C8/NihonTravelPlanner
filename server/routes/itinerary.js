const express = require('express');
const router = express.Router();

const Itinerary = require('../models/Itinerary');
const auth = require('../middleware/authMiddleware');
const { itineraryValidation } = require('../validators/itineraryValidator');
const validate = require('../middleware/validate');

// Create an itinerary entry with validation
router.post('/', auth, itineraryValidation, validate, async (req, res) => {
  try {
    const itinerary = new Itinerary({ ...req.body, user: req.user.id });
    const saved = await itinerary.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create itinerary' });
  }
});

// GET all itineraries of the user
router.get('/', auth, async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user.id });
    res.status(200).json(itineraries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch itineraries' });
  }
});

// Get all itineraries for a trip
router.get('/:tripId', auth, async (req, res) => {
  try {
    const items = await Itinerary.find({ tripId: req.params.tripId });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch itinerary' });
  }
});

// Update an itinerary by ID with validation
router.put('/:id', auth, itineraryValidation, validate, async (req, res) => {
  try {
    const updated = await Itinerary.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    res.status(200).json({
      message: 'Itinerary updated successfully',
      itinerary: updated
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update itinerary" });
  }
});

// Delete an itinerary by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deleted) return res.status(404).json({ error: "Itinerary not found" });

    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete itinerary" });
  }
});

module.exports = router;
