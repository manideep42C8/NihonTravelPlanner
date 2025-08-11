//validators/itineraryValidator.js
const { body } = require('express-validator');

exports.itineraryValidation = [
  body('tripId').notEmpty().withMessage('Trip ID is required'),
  body('day').isInt({ min: 1 }).withMessage('Day must be a positive integer'),
  body('activities')
    .isArray().withMessage('Activities must be an array')
    .custom((arr) => arr.length > 0).withMessage('Activities cannot be empty')
];
