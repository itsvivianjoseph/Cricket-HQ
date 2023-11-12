const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["Player", "Umpire", "TeamManager"],
    required: true,
  },
  description: String,
});

const UserRole = mongoose.model("UserRole", userRoleSchema);

module.exports = UserRole;