const express = require("express");
const router = express.Router();

const {
  createSlotController,
  getAllSlotsController,
  getSlotByIdController,
  updateSlotController,
  deleteSlotController,
} = require("../controllers/slot.controller");

// Create Slot
router.post("/", createSlotController);

// Get All Slots
router.get("/", getAllSlotsController);

// Get Slot By ID
router.get("/:id", getSlotByIdController);

// Update Slot
router.put("/:id", updateSlotController);

// Delete Slot
router.delete("/:id", deleteSlotController);

module.exports = router;