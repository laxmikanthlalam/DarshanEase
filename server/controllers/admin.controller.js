const User = require("../models/user.model");
const Temple = require("../models/temple.model");
const Slot = require("../models/slot.model");
const Booking = require("../models/booking.model");

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTemples = await Temple.countDocuments();
    const totalSlots = await Slot.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const revenue = await Booking.aggregate([
      {
        $match: {
          bookingStatus: "CONFIRMED",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      revenue.length > 0 ? revenue[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalTemples,
        totalSlots,
        totalBookings,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};