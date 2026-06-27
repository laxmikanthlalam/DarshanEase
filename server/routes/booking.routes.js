const express = require("express");
const router = express.Router();

const {
  createBookingController,
  getAllBookingsController,
  getBookingByIdController,
  deleteBookingController,
} = require("../controllers/booking.controller");

// Create Booking
router.post("/", createBookingController);

// Get All Bookings
router.get("/", getAllBookingsController);

// Get Booking By ID
router.get("/:id", getBookingByIdController);

// Delete Booking
router.delete("/:id", deleteBookingController);

module.exports = router;
