// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);  // Logs error details in your terminal for debugging

  res.status(err.statusCode || 500).json({
    message: err.message || 'Server Error'  // Sends this message as a response
  });
};

module.exports = errorHandler;
