//controllers/cityController.js
const City = require("../models/City");
const Attraction = require("../models/Attraction");

// GET /api/cities
const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/cities/:cityId/attractions
const getAttractionsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const attractions = await Attraction.find({ city: cityId });
    console.log("Fetching attractions for cityId:", cityId);
    res.json(attractions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getCities,
  getAttractionsByCity,
};
