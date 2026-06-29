const Slot = require("../models/slot.model");

// Create Slot
const createSlot = async (slotData) => {
  return await Slot.create(slotData);
};

// Get All Slots
const getAllSlots = async () => {
  return await Slot.find().populate("temple");
};

// Get Slot By ID
const getSlotById = async (id) => {
  return await Slot.findById(id).populate("temple");
};

// Update Slot
const updateSlot = async (id, slotData) => {
  return await Slot.findByIdAndUpdate(id, slotData, {
    new: true,
    runValidators: true,
  }).populate("temple");
};

// Delete Slot
const deleteSlot = async (id) => {
  return await Slot.findByIdAndDelete(id);
};

// Get Slots By Temple
const getSlotsByTemple = async (templeId) => {
  return await Slot.find({ temple: templeId });
};

module.exports = {
  createSlot,
  getAllSlots,
  getSlotById,
  getSlotsByTemple,
  updateSlot,
  deleteSlot,
};