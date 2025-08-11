//routes/trips.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { tripValidation } = require("../validators/tripValidator");
const validate = require("../middleware/validate");
const tripController = require("../controllers/tripController");

router.post("/", auth, tripValidation, validate, tripController.createTrip);
router.get("/", auth, tripController.getTrips);
router.put("/:id", auth, tripValidation, validate, tripController.updateTrip);
router.delete("/:id", auth, tripController.deleteTrip);

module.exports = router;
