const express = require("express");
const router = express.Router();

const {
  createTempleController,
  getAllTemplesController,
  getTempleByIdController,
  updateTempleController,
  deleteTempleController,
} = require("../controllers/temple.controller");

// Create Temple
router.post("/", createTempleController);

// Get All Temples
router.get("/", getAllTemplesController);

// Get Temple By ID
router.get("/:id", getTempleByIdController);

// Update Temple
router.put("/:id", updateTempleController);

// Delete Temple
router.delete("/:id", deleteTempleController);

module.exports = router;