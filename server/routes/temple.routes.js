const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
  createTempleController,
  getAllTemplesController,
  getFeaturedTemplesController,
  getTempleByIdController,
  updateTempleController,
  deleteTempleController,
} = require("../controllers/temple.controller");

// ================= PUBLIC ROUTES =================

// Get Featured Temples (Home Page)
router.get("/featured", getFeaturedTemplesController);

// Get All Temples
router.get("/", getAllTemplesController);

// Get Temple By ID
router.get("/:id", getTempleByIdController);

// ================= ADMIN ROUTES =================

// Create Temple
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTempleController
);

// Update Temple
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateTempleController
);

// Delete Temple
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteTempleController
);

module.exports = router;