const mongoose = require("mongoose");

const UmpireSchema = new mongoose.Schema({
  umpireId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  umpireLevel: {
    type: String,
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
  },
});

const Umpire = mongoose.model("Umpire", UmpireSchema);

module.exports = Umpire;