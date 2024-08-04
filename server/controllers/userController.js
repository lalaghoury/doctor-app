const User = require("../models/User");
const bcrypt = require("bcryptjs");

function removeNullUndefined(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

module.exports = userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json({ users, success: true, message: "All users fetched" });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Failed to get users", success: false });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json({ user, success: true, message: "User fetched" });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Failed to get user", success: false });
    }
  },
  getUserWithAuth: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      res.json({ user, success: true, message: "User fetched" });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Failed to get user", success: false });
    }
  },
  updateUser: async (req, res) => {
    const filteredObj = removeNullUndefined(req.body);

    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { ...filteredObj },
        {
          new: true,
        }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      res.json({ user, success: true, message: "User updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Failed to update user", success: false });
    }
  },
  updateUserPassword: async (req, res) => {
    const filteredObj = removeNullUndefined(req.body);

    try {
      const { oldPassword, newPassword } = filteredObj;

      const user = await User.findById(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Old password is incorrect", success: false });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { password: hashedPassword },
        {
          new: true,
        }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      res.json({
        user: updatedUser,
        success: true,
        message: "Password updated Successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Failed to update user", success: false });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.json({ user, success: true, message: "User deleted Successfully" });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Failed to delete user",
        success: false,
      });
    }
  },
};
