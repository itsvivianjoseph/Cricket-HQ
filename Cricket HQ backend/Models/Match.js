const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  teamOne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  teamTwo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: String,
  result: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Result",
  },
  teamOnePlayers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  teamTwoPlayers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;