// server/routes/itinerary.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { itineraryValidation } = require("../validators/itineraryValidator");
const validate = require("../middleware/validate");
const itineraryController = require("../controllers/itineraryController");

router.post("/", auth, itineraryValidation, validate, itineraryController.createItinerary);
router.get("/", auth, itineraryController.getItineraries);
router.get("/:tripId", auth, itineraryController.getItinerariesByTrip);
router.put("/:id", auth, itineraryValidation, validate, itineraryController.updateItinerary);
router.delete("/:id", auth, itineraryController.deleteItinerary);

module.exports = router;
