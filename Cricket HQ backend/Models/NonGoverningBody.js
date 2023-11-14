const mongoose = require("mongoose");

const nonGoverningBodySchema = new mongoose.Schema({
  ngbId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  }
});

const NonGoverningBody = mongoose.model("NonGoverningBody", nonGoverningBodySchema);

module.exports = NonGoverningBody;