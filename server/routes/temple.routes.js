const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
  createTempleController,
  getAllTemplesController,
  getTempleByIdController,
  updateTempleController,
  deleteTempleController,
} = require("../controllers/temple.controller");

// Create Temple (Admin Only)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTempleController
);

// Get All Temples (Public)
router.get("/", getAllTemplesController);

// Get Temple By ID (Public)
router.get("/:id", getTempleByIdController);

// Update Temple (Admin Only)
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateTempleController
);

// Delete Temple (Admin Only)
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteTempleController
);

module.exports = router;