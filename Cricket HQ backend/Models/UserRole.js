const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: [
      "Player",
      "Umpire",
      "TeamManager",
      "Administrator",
      "Coach",
      "Scout",
      "Manager",
      "Scorer",
    ],
    required: true,
  },
  description: String,
});

const UserRole = mongoose.model("UserRole", userRoleSchema);

module.exports = UserRole;