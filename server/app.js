const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const templeRoutes = require("./routes/temple.routes");
const slotRoutes = require("./routes/slot.routes");
const bookingRoutes = require("./routes/booking.routes");
const adminRoutes = require("./routes/admin.routes");
const statsRoutes = require("./routes/stats.routes");

// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");


const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));


// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to DarshanEase API 🚩",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stats", statsRoutes);

module.exports = app;