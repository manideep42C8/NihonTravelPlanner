//controllers/tripController.js
const Trip = require("../models/Trip");

exports.createTrip = async (req, res, next) => {
  try {
    const trip = new Trip({ ...req.body, user: req.user.id });
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    next(error);
  }
};

exports.getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ user: req.user.id });
    res.status(200).json(trips);
  } catch (error) {
    next(error);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedTrip) return res.status(404).json({ error: "Trip not found" });
    res.status(200).json(updatedTrip);
  } catch (error) {
    next(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const deletedTrip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedTrip) return res.status(404).json({ error: "Trip not found" });
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    next(error);
  }
};
