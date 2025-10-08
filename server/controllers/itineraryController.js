//controllers/itineraryController.js
const Itinerary = require("../models/Itinerary");
const Trip = require("../models/Trip");   // assuming you have Trips model
const Attraction = require("../models/Attraction");
const City = require("../models/City");

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

// Utility: group by city
function groupByCity(attractions) {
  const grouped = {};
  for (const attr of attractions) {
    const cityId = attr.city._id.toString();
    if (!grouped[cityId]) grouped[cityId] = [];
    grouped[cityId].push(attr);
  }
  return grouped;
}

function canFitInDay(totalMinutes, attractionDuration) {
  const TRAVEL_BUFFER = 30; // 30 min travel between attractions
  return (totalMinutes + attractionDuration + TRAVEL_BUFFER) <= 480; // 8h/day
}

// --- Main Function ---
exports.generateItinerary = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.tripId).populate({
      path: "days.attractions",
      populate: { path: "city" },
    });

    if (!trip) return res.status(404).json({ message: "Trip not found." });

    // 1️⃣ Fetch all attractions from trip's days
    const allAttractions = trip.days.flatMap(d => d.attractions);

    if (!allAttractions.length) {
      return res.status(404).json({ message: "No attractions found in this trip." });
    }

    // 2️⃣ Group attractions by city
    const cityGroups = groupByCity(allAttractions);

    // 3️⃣ Prepare itinerary days
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    const daysCount = Math.ceil((+endDate - +startDate) / (1000 * 60 * 60 * 24)) + 1;

    const days = Array.from({ length: daysCount }, (_, i) => ({
      day: i + 1,
      activities: [],
      attractions: [],
      image: "",
    }));

    // 4️⃣ Fill days
    let dayIndex = 0;
    for (const cityId of Object.keys(cityGroups)) {
      const attractions = cityGroups[cityId].sort(
        (a, b) => b.rating - a.rating || a.duration - b.duration
      );

      for (const attr of attractions) {
        let currentDay = days[dayIndex];
        const currentMinutes = currentDay.activities.reduce(
          (sum, a) => sum + (a.duration || 0),
          0
        );

        if (!canFitInDay(currentMinutes, attr.duration)) {
          if (dayIndex + 1 < daysCount) {
            dayIndex++;
            currentDay = days[dayIndex];
          } else {
            // No more days left, skip remaining attractions
            continue;
          }
        }

        // Add activity
        currentDay.activities.push({
          name: `${attr.name} (${attr.city.name})`,
          time: "", // optional
          duration: attr.duration,
        });
        currentDay.attractions.push(attr._id);

        // Set image if not already set
        if (!currentDay.image && attr.images?.length) {
          currentDay.image = attr.images[0];
        }
      }
    }

    // 5️⃣ Create itinerary document
    const itinerary = new Itinerary({
      tripId: trip._id,
      user: req.user.id,
      title: trip.title + " Itinerary",
      days,
      preferences: trip.preferences || [],
      notes: trip.notes,
    });

    const savedItinerary = await itinerary.save();
    res.status(201).json(savedItinerary);

  } catch (error) {
    console.error("Error generating itinerary:", error);
    next(error);
  }
};