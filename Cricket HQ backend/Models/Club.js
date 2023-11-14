const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
  },
  clubOwner: {
    type: String,
    required: true,
  },
  clubPhoneNumber: {
    type: String,
    required: true,
  },
  clubEmail: {
    type: String,
    required: true, 
  },
  sportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sport",
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});

const Club = mongoose.model("Club", clubSchema);

module.exports = Club;