const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');
const auth = require('../middleware/auth');

// Create an itinerary entry
router.post('/', auth, async (req, res) => {
  try {
    const itinerary = new Itinerary({...req.body,user: req.user.userId});
    const saved = await itinerary.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create itinerary' });
  }
});

// GET all itineraries of the user (Option 2)
router.get('/', auth, async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user.userId });
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

// Update itinerary
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Itinerary not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update itinerary' });
  }
});

// Delete itinerary
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Itinerary.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Itinerary not found' });
    res.status(200).json({ message: 'Itinerary deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete itinerary' });
  }
});

module.exports = router;
