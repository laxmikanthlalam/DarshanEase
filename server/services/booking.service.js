const Booking = require("../models/booking.model");

// Create Booking
const createBooking = async (bookingData) => {
  return await Booking.create(bookingData);
};

// Get All Bookings
const getAllBookings = async () => {
  return await Booking.find()
    .populate("user", "fullName email")
    .populate("temple", "name")
    .populate("slot", "slotName date");
};

// Get Booking By ID
const getBookingById = async (id) => {
  return await Booking.findById(id)
    .populate("user", "fullName email")
    .populate("temple", "name")
    .populate("slot", "slotName date");
};

// Get Bookings By User
const getBookingsByUser = async (userId) => {
  return await Booking.find({ user: userId })
    .populate("temple", "name")
    .populate("slot", "slotName date");
};

// Update Booking
const updateBooking = async (id, bookingData) => {
  return await Booking.findByIdAndUpdate(id, bookingData, {
    new: true,
    runValidators: true,
  });
};

// Delete Booking
const deleteBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  updateBooking,
  deleteBooking,
};