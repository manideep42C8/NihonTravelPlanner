const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // ✅ MongoDB connection
const protectedRoutes = require("./routes/protected");
const tripRoutes = require('./routes/trips');
const itineraryRoutes = require('./routes/itinerary');
const userRoutes = require('./routes/user');
const errorHandler = require('./middleware/errorHandler');



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

app.use('/api/users', userRoutes);

app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
