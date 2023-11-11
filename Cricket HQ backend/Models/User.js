const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullName: String,
  registrationDate: {
    type: Date,
    required: true,
  },
  userRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRole",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// Fields
// - user_id (Primary Key)
// - username
// - password_hash
// - email
// - full_name
// - registration_date
// - last_login
// - user_role (Foreign Key to UserRole Table)