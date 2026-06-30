const {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  updateBooking,
  deleteBooking,
} = require("../services/booking.service");

const Slot = require("../models/slot.model");

// ====================== CREATE BOOKING ======================
const createBookingController = async (req, res) => {
  try {
    const { user, temple, slot, numberOfPersons } = req.body;

    const slotData = await Slot.findById(slot);

    if (!slotData) {
      return res.status(404).json({
        success: false,
        message: "Darshan Slot not found",
      });
    }

    if (slotData.availableSeats < numberOfPersons) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    const totalAmount = slotData.price * numberOfPersons;

    // Reduce seats
    slotData.availableSeats -= numberOfPersons;

    // Update slot status
    if (slotData.availableSeats === 0) {
      slotData.status = "FULL";
    } else {
      slotData.status = "AVAILABLE";
    }

    await slotData.save();

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

// ====================== GET ALL BOOKINGS ======================
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

// ====================== GET BOOKING BY ID ======================
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
// ====================== CANCEL BOOKING ======================
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

    // Never exceed capacity
    if (slot.availableSeats > slot.capacity) {
      slot.availableSeats = slot.capacity;
    }

    // Update slot status
    slot.status = "AVAILABLE";

    await slot.save();

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

// ====================== DELETE BOOKING ======================
const deleteBookingController = async (req, res) => {
  try {
    // Find booking first
    const booking = await getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Restore seats only if booking wasn't already cancelled
    if (booking.bookingStatus !== "CANCELLED") {
      const slot = await Slot.findById(booking.slot._id);

      if (slot) {
        slot.availableSeats += booking.numberOfPersons;

        // Never exceed capacity
        if (slot.availableSeats > slot.capacity) {
          slot.availableSeats = slot.capacity;
        }

        // Update slot status
        slot.status = "AVAILABLE";

        await slot.save();
      }
    }

    await deleteBooking(req.params.id);

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

// ====================== MY BOOKINGS ======================
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