const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["player", "umpire", "team manager"],
    required: true,
  },
  description: String,
});

const UserRole = mongoose.model("UserRole", userRoleSchema);

module.exports = UserRole;