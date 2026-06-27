const bcrypt = require("bcryptjs");

const {
  registerUser,
  loginUser: loginService,
} = require("../services/auth.service");

const { validateRegister } = require("../validations/auth.validation");

// Register Controller
const register = async (req, res) => {
  try {
    const error = validateRegister(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const { fullName, email, password, phone } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await registerUser({
      fullName,
      email,
      password: hashedPassword,
      phone,
    });

    // Remove password from response
    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};