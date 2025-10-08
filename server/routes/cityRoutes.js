//routes/cityRoutes.js
const express = require("express");
const { getCities, getAttractionsByCity } = require("../controllers/cityController");

const router = express.Router();

// GET all cities
router.get("/", getCities);

// GET attractions by city
router.get("/:cityId/attractions", getAttractionsByCity);

module.exports = router;  // ✅ CommonJS export
