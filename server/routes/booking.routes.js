const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createBookingController,
  getAllBookingsController,
  getBookingByIdController,
  getMyBookingsController,
  cancelBookingController,
  deleteBookingController,
} = require("../controllers/booking.controller");

router.post("/", createBookingController);

router.get("/", getAllBookingsController);

router.get("/my", authMiddleware, getMyBookingsController);

router.get("/:id", getBookingByIdController);

router.put("/:id/cancel", cancelBookingController);

router.delete("/:id", deleteBookingController);

module.exports = router;