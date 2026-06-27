const {
  createSlot,
  getAllSlots,
  getSlotById,
  updateSlot,
  deleteSlot,
} = require("../services/slot.service");

const { validateSlot } = require("../validations/slot.validation");

// Create Slot
const createSlotController = async (req, res) => {
  try {
    const error = validateSlot(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const slot = await createSlot(req.body);

    res.status(201).json({
      success: true,
      message: "Darshan slot created successfully",
      data: slot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Slots
const getAllSlotsController = async (req, res) => {
  try {
    const slots = await getAllSlots();

    res.status(200).json({
      success: true,
      count: slots.length,
      data: slots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Slot By ID
const getSlotByIdController = async (req, res) => {
  try {
    const slot = await getSlotById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    res.status(200).json({
      success: true,
      data: slot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Slot
const updateSlotController = async (req, res) => {
  try {
    const slot = await updateSlot(req.params.id, req.body);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Darshan slot updated successfully",
      data: slot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Slot
const deleteSlotController = async (req, res) => {
  try {
    const slot = await deleteSlot(req.params.id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Darshan slot deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSlotController,
  getAllSlotsController,
  getSlotByIdController,
  updateSlotController,
  deleteSlotController,
};