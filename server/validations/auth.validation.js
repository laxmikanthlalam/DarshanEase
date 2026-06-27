const validator = require("validator");

const validateRegister = ({ fullName, email, password, phone }) => {
  if (!fullName || !email || !password || !phone) {
    return "All fields are required";
  }

  if (!validator.isEmail(email)) {
    return "Invalid email";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (!validator.isMobilePhone(phone, "en-IN")) {
    return "Invalid phone number";
  }

  return null;
};

module.exports = {
  validateRegister,
};