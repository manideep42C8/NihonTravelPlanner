const express = require('express');
const router = express.Router();

const Itinerary = require('../models/Itinerary');
const auth = require('../middleware/authMiddleware');
const { itineraryValidation } = require('../validators/itineraryValidator');
const validate = require('../middleware/validate');

// Create an itinerary entry with validation
router.post('/', auth, itineraryValidation, validate, async (req, res, next) => {
  try {
    const itinerary = new Itinerary({ ...req.body, user: req.user.id });
    const saved = await itinerary.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});

// GET all itineraries of the user
router.get('/', auth, async (req, res, next) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user.id });
    res.status(200).json(itineraries);
  } catch (error) {
    next(error);
  }
});

// Get all itineraries for a trip
router.get('/:tripId', auth, async (req, res, next) => {
  try {
    const items = await Itinerary.find({ tripId: req.params.tripId });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// Update an itinerary by ID with validation
router.put('/:id', auth, itineraryValidation, validate, async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
});

// Delete an itinerary by ID
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const deleted = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deleted) return res.status(404).json({ error: "Itinerary not found" });

    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
