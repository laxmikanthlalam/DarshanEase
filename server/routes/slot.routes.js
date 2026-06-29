const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
  createSlotController,
  getAllSlotsController,
  getSlotByIdController,
  getSlotsByTempleController,
  updateSlotController,
  deleteSlotController,
} = require("../controllers/slot.controller");

// Create Slot (Admin Only)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createSlotController
);

// Get All Slots (Public)
router.get("/", getAllSlotsController);

router.get("/temple/:templeId", getSlotsByTempleController);

// Get Slot By ID (Public)
router.get("/:id", getSlotByIdController);

// Update Slot (Admin Only)
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateSlotController
);

// Delete Slot (Admin Only)
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteSlotController
);

module.exports = router;