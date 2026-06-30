const User = require("../models/user.model");
const Temple = require("../models/temple.model");
const Slot = require("../models/slot.model");
const Booking = require("../models/booking.model");

const getPublicStats = async () => {
  const totalUsers = await User.countDocuments();
  const totalTemples = await Temple.countDocuments();
  const totalSlots = await Slot.countDocuments();
  const totalBookings = await Booking.countDocuments();

  return {
    totalUsers,
    totalTemples,
    totalSlots,
    totalBookings,
  };
};

module.exports = {
  getPublicStats,
};