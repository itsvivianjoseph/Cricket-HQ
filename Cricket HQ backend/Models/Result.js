const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  outcome: {
    type: String,
    enum: ["Win", "Loss", "Draw", "Tie", "No Result"],
    required: true,
  }
});

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;