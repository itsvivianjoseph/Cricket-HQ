const mongoose = require("mongoose")

const TeamManagerSchema = new mongoose.model({
    managerId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    teamId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    contactNumber : {
        type : string,
        required : true
    }
})

const TeamManager = mongoose.model("TeamManager",TeamManagerSchema)

module.exports = TeamManager