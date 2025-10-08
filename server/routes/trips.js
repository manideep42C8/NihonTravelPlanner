//routes/trips.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { tripValidation } = require("../validators/tripValidator");
const validate = require("../middleware/validate");
const tripController = require("../controllers/tripController");
const { generateItinerary } = require("../controllers/itineraryController");

router.post("/", auth, tripValidation, validate, tripController.createTrip);
router.get("/", auth, tripController.getTrips);
router.get("/:id", auth, tripController.getTripById);

router.put("/:id", auth, tripValidation, validate, tripController.updateTrip);
router.delete("/:id", auth, tripController.deleteTrip);
router.post(
  "/suggestions",
  auth,
  tripController.createSuggestedTrip
);
router.post("/:tripId/generate-itinerary", auth, generateItinerary);

module.exports = router;
