const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  sgbName: {
    type: String,
    required: true,
  },
  dgbName: {
    type: String,
    required: true,
  }
});

const District = mongoose.model("District", districtSchema);

module.exports = District;