const validateSlot = (data) => {
  const {
    temple,
    slotName,
    date,
    startTime,
    endTime,
    capacity,
    availableSeats,
  } = data;

  if (!temple) return "Temple ID is required";
  if (!slotName) return "Slot name is required";
  if (!date) return "Date is required";
  if (!startTime) return "Start time is required";
  if (!endTime) return "End time is required";
  if (capacity === undefined) return "Capacity is required";
  if (availableSeats === undefined) return "Available seats are required";

  if (capacity < 1) return "Capacity must be greater than 0";
  if (availableSeats < 0) return "Available seats cannot be negative";
  if (availableSeats > capacity)
    return "Available seats cannot exceed capacity";

  return null;
};

module.exports = {
  validateSlot,
};