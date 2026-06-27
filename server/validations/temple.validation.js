const validateTemple = (data) => {
  const {
    name,
    location,
    description,
    openingTime,
    closingTime,
  } = data;

  if (!name) return "Temple name is required";
  if (!location) return "Temple location is required";
  if (!description) return "Temple description is required";
  if (!openingTime) return "Opening time is required";
  if (!closingTime) return "Closing time is required";

  return null;
};

module.exports = {
  validateTemple,
};