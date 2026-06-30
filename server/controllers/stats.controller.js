const {
  getPublicStats,
} = require("../services/stats.service");

const getStats = async (req, res) => {
  try {
    const stats = await getPublicStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStats,
};