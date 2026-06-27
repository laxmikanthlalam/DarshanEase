const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

// Register Service
const registerUser = async (userData) => {
  return await User.create(userData);
};

// Login Service
const loginUser = async (email, password) => {
  // Include password because it has select:false
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Email or Password");
  }

  const token = generateToken(user._id);

  // Remove password before returning
  user.password = undefined;

  return {
    token,
    user,
  };
};

module.exports = {
  registerUser,
  loginUser,
};