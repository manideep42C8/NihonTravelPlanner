//controllers/tripController.js
const Trip = require("../models/Trip");
const Attraction = require("../models/Attraction"); // we will fetch attractions
const City = require("../models/City"); // optional, if you need city info


exports.createTrip = async (req, res, next) => {
  try {
    const trip = new Trip({ ...req.body, user: req.user.id });
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    next(error);
  }
};

exports.getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id })
      .populate("days.attractions")
      .populate("destination", "name");;  // ✅ load attraction details
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.status(200).json(trip);
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


// SCIP: Smart Clustered Itinerary Planning (Enhanced)
exports.createSuggestedTrip = async (req, res, next) => {
  try {
    const { title, startDate, endDate, preferences = [], notes = "" } = req.body;

    if (!title || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysCount = Math.ceil((+end - +start) / (1000 * 60 * 60 * 24)) + 1;

    if (daysCount <= 0) {
      return res.status(400).json({ message: "End date must be after start date." });
    }

    // 1️⃣ Fetch attractions
    let query = {};
    if (preferences.length > 0) query.category = { $in: preferences };
    const allAttractions = await Attraction.find(query).populate("city");

    if (!allAttractions || allAttractions.length === 0) {
      return res.status(404).json({ message: "No attractions found." });
    }

    // 2️⃣ Group by city
    const cityMap = {};
    allAttractions.forEach(attr => {
      const cityName = attr.city.name;
      if (!cityMap[cityName]) cityMap[cityName] = [];
      cityMap[cityName].push(attr);
    });

    // 3️⃣ Sort cities by avg rating (high → low)
    const cityOrder = Object.keys(cityMap).sort((a, b) => {
      const scoreA = cityMap[a].reduce((sum, at) => sum + at.rating, 0) / cityMap[a].length;
      const scoreB = cityMap[b].reduce((sum, at) => sum + at.rating, 0) / cityMap[b].length;
      return scoreB - scoreA;
    });

    const MAX_DAY_MINUTES = 8 * 60; // 8 hours/day
    const days = Array.from({ length: daysCount }, (_, i) => ({
      day: i + 1,
      activities: [],
      attractions: [],
      image: ""
    }));

    let dayIndex = 0;

    // 4️⃣ Allocate attractions
    for (const cityName of cityOrder) {
      const attractions = cityMap[cityName].sort((a, b) => b.rating - a.rating || a.duration - b.duration);

      for (const attr of attractions) {
        if (dayIndex >= daysCount) break; // Stop if all days filled

        let currentDay = days[dayIndex];

        // Calculate current total minutes in this day
        const currentMinutes = currentDay.activities.reduce((sum, a) => sum + (a.duration || 0), 0);

        // If adding this attraction exceeds 8 hours/day, move to next day if available
        if (currentMinutes + attr.duration > MAX_DAY_MINUTES) {
          if (dayIndex + 1 < daysCount) {
            dayIndex++;
            currentDay = days[dayIndex];
          } else {
            break; // no more days left
          }
        }

        // Add activity (object format)
        currentDay.activities.push({
          name: `${attr.name} (${cityName})`,
          time: "",
          duration: attr.duration || 60
        });


        currentDay.attractions.push(attr._id);

        // Set image if not set
        if (!currentDay.image && attr.images && attr.images.length > 0) {
          currentDay.image = attr.images[0];
        }
      }
    }

    // 5️⃣ Save trip
    const trip = new Trip({
      title,
      startDate: start,
      endDate: end,
      days,
      preferences,
      notes,
      user: req.user.id,
      destination: "Suggested Itinerary"
    });

    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);

  } catch (error) {
    console.error("Error in createSuggestedTrip:", error);
    next(error);
  }
};


