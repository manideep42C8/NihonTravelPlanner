//controllers/itineraryController.js
const Itinerary = require("../models/Itinerary");

exports.createItinerary = async (req, res, next) => {
  try {
    const itinerary = new Itinerary({ ...req.body, user: req.user.id });
    const saved = await itinerary.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

exports.getItineraries = async (req, res, next) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user.id });
    res.status(200).json(itineraries);
  } catch (error) {
    next(error);
  }
};

exports.getItinerariesByTrip = async (req, res, next) => {
  try {
    const items = await Itinerary.find({ tripId: req.params.tripId });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

exports.updateItinerary = async (req, res, next) => {
  try {
    const updated = await Itinerary.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Itinerary not found" });
    res.status(200).json({ message: "Itinerary updated successfully", itinerary: updated });
  } catch (error) {
    next(error);
  }
};

exports.deleteItinerary = async (req, res, next) => {
  try {
    const deleted = await Itinerary.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ error: "Itinerary not found" });
    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    next(error);
  }
};
