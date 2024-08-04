require("dotenv").config();
const JWT = require("jsonwebtoken");
const User = require("../models/User");

const requireSignin = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader?.split(" ")[1]) {
      token = authHeader?.split(" ")[1];
    } else {
      token = req.cookies.auth;
    }

    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decode?.userId);

    if (!user) {
      return res.status(401).json({
        message: "Profile not found. Please login again.",
        success: false,
      });
    }

    if (user.status !== "active") {
      return res.status(401).json({
        message: "You are not authorized to access this resource.",
        success: false,
      });
    }

    req.user = { ...user._doc, userId: user._id };

    next();
  } catch (error) {
    console.error("Error in requireSignin middleware:", error);
    return res.status(401).json({
      message: "Please login to continue",
      success: false,
      error: error.message,
    });
  }
};

const isDoctor = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "doctor" || user.status !== "active") {
      return res.status(401).json({
        message: "You are not authorized to access this resource.",
        success: false,
      });
    }

    req.user = { ...user._doc, userId: user._id };

    next();
  } catch (error) {
    console.error("Error in isDoctor middleware:", error);
    return res.status(401).json({
      message: "Please login to continue",
      success: false,
      error: error.message,
    });
  }
};

const isPatient = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "patient" || user.status !== "active") {
      return res.status(401).json({
        message: "You are not authorized to access this resource.",
        success: false,
      });
    }

    req.user = { ...user._doc, userId: user._id };

    next();
  } catch (error) {
    console.error("Error in isPatient middleware:", error);
    return res.status(401).json({
      message: "Please login to continue",
      success: false,
      error: error.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "admin" || user.status !== "active") {
      return res.status(401).json({
        message: "You are not authorized to access this resource.",
        success: false,
      });
    }

    req.user = { ...user._doc, userId: user._id };

    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    return res.status(401).json({
      message: "Please login to continue",
      success: false,
      error: error.message,
    });
  }
};

const SignToken = (userId) => {
  return JWT.sign(
    {
      userId,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = {
  SignToken,
  isDoctor,
  isPatient,
  isAdmin,
  requireSignin,
};
