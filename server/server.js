const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // ✅ MongoDB connection
const protectedRoutes = require("./routes/protected");
const tripRoutes = require('./routes/trips');
const itineraryRoutes = require('./routes/itinerary');


dotenv.config();         // ✅ Load environment variables
connectDB();             // ✅ Connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json());

// Auth Routes
app.use("/api/auth", require("./routes/auth"));

app.use("/api", protectedRoutes);

app.use('/api/trips', tripRoutes);

app.use('/api/itinerary', itineraryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
