const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  playerRole: {
    type: String,
    required: true,
  },
  playerStats: {
    type: Object,
  },
  nonGoverningBodyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NonGoverningBody",
  },
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
  },
  sportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sport",
  }
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;