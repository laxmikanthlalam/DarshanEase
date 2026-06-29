const {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  updateBooking,
  deleteBooking,
} = require("../services/booking.service");

const Slot = require("../models/slot.model");

// Create Booking
const createBookingController = async (req, res) => {
  try {
    const { user, temple, slot, numberOfPersons } = req.body;

    // Find Slot
    const slotData = await Slot.findById(slot);

    if (!slotData) {
      return res.status(404).json({
        success: false,
        message: "Darshan Slot not found",
      });
    }

    // Check Available Seats
    if (slotData.availableSeats < numberOfPersons) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    // Calculate Total Amount
    const totalAmount = slotData.price * numberOfPersons;

    // Reduce Available Seats
    slotData.availableSeats -= numberOfPersons;
    await slotData.save();

    // Create Booking
    const booking = await createBooking({
      user,
      temple,
      slot,
      numberOfPersons,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Bookings
const getAllBookingsController = async (req, res) => {
  try {
    const bookings = await getAllBookings();

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Booking By ID
const getBookingByIdController = async (req, res) => {
  try {
    const booking = await getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel Booking
const cancelBookingController = async (req, res) => {
  try {
    const booking = await getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.bookingStatus === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    const slot = await Slot.findById(booking.slot._id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    // Restore seats
    slot.availableSeats += booking.numberOfPersons;
    await slot.save();

    // Update booking status
    const updatedBooking = await updateBooking(booking._id, {
      bookingStatus: "CANCELLED",
    });

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Booking
const deleteBookingController = async (req, res) => {
  try {
    const booking = await deleteBooking(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyBookingsController = async (req, res) => {
  try {
    const bookings = await getBookingsByUser(req.user.id);

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBookingController,
  getAllBookingsController,
  getBookingByIdController,
  getMyBookingsController,
  cancelBookingController,
  deleteBookingController,
};