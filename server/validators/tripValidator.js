//validators/triipValidator.js
const { body } = require('express-validator');

exports.tripValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('destination').notEmpty().withMessage('Destination is required'),
  body('startDate').isISO8601().withMessage('Valid start date required'),
  body('endDate').isISO8601().withMessage('Valid end date required')
];
