const mongoose = require("mongoose");

const stateGoverningBodySchema = new mongoose.Schema({
  sgbId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  nonGoverningBodyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NonGoverningBody",
    required: true,
  }
});

const StateGoverningBody = mongoose.model("StateGoverningBody", stateGoverningBodySchema);

module.exports = StateGoverningBody;