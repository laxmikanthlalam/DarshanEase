const {
  createTemple,
  getAllTemples,
  getFeaturedTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
} = require("../services/temple.service");

// Create Temple
const createTempleController = async (req, res) => {
  try {
    const temple = await createTemple(req.body);

    res.status(201).json({
      success: true,
      message: "Temple created successfully",
      data: temple,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Temples
const getAllTemplesController = async (req, res) => {
  try {
    const temples = await getAllTemples();

    res.status(200).json({
      success: true,
      count: temples.length,
      data: temples,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ⭐ Get Featured Temples (Home Page)
const getFeaturedTemplesController = async (req, res) => {
  try {
    const temples = await getFeaturedTemples();

    res.status(200).json({
      success: true,
      count: temples.length,
      data: temples,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Temple By ID
const getTempleByIdController = async (req, res) => {
  try {
    const temple = await getTempleById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    res.status(200).json({
      success: true,
      data: temple,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Temple
const updateTempleController = async (req, res) => {
  try {
    const temple = await updateTemple(req.params.id, req.body);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Temple updated successfully",
      data: temple,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Temple
const deleteTempleController = async (req, res) => {
  try {
    const temple = await deleteTemple(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Temple deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTempleController,
  getAllTemplesController,
  getFeaturedTemplesController,
  getTempleByIdController,
  updateTempleController,
  deleteTempleController,
};