const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    startedYear: {
        type: Number, 
        required: true,
    },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;