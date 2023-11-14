const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
  regionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  }
});

const Region = mongoose.model("Region", regionSchema);

module.exports = Region;