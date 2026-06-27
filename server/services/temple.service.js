const Temple = require("../models/temple.model");

// Create Temple
const createTemple = async (templeData) => {
  return await Temple.create(templeData);
};

// Get All Temples
const getAllTemples = async () => {
  return await Temple.find();
};

// Get Temple By ID
const getTempleById = async (id) => {
  return await Temple.findById(id);
};

// Update Temple
const updateTemple = async (id, templeData) => {
  return await Temple.findByIdAndUpdate(id, templeData, {
    new: true,
    runValidators: true,
  });
};

// Delete Temple
const deleteTemple = async (id) => {
  return await Temple.findByIdAndDelete(id);
};

module.exports = {
  createTemple,
  getAllTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
};