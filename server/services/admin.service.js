const User = require("../models/user.model");
const Temple = require("../models/temple.model");
const Slot = require("../models/slot.model");
const Booking = require("../models/booking.model");

const getDashboardStats = async () => {
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
        totalRevenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  const totalRevenue =
    revenue.length > 0 ? revenue[0].totalRevenue : 0;

  return {
    totalUsers,
    totalTemples,
    totalSlots,
    totalBookings,
    totalRevenue,
  };
};

module.exports = {
  getDashboardStats,
};