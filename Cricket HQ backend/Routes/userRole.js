const express = require("express");
const router = express.Router();
const Player = require("../Models/Player");
const Umpire = require("../Models/Umpire");
const TeamManager = require("../Models/TeamManager");

// Add role-specific information
router.post("/:role", async (req, res) => {
    try {
        const { role } = req.params; // Get the role from URL parameter
        if (role === "Player") {
            const { userId, teamId, dateOfBirth, playerRole, playerStats } = req.body;
            const player = new Player({ userId, teamId, dateOfBirth, playerRole, playerStats });
            await player.save();
        } else if (role === "Umpire") {
            const { userId, umpireLevel, experienceYears } = req.body;
            const umpire = new Umpire({ userId, umpireLevel, experienceYears });
            await umpire.save();
        } else if (role === "TeamManager") {
            const { managerId, teamId, contactNumber } = req.body;
            const teamManager = new TeamManager({ managerId, teamId, contactNumber });
            await teamManager.save();
        } else {
            return res.status(400).send("Invalid user role");
        }

        res.status(201).json({ message: `${role} information added successfully` });
    } catch (error) {
        res.status(500).json({ error: "Error adding role-specific information" });
    }
});

module.exports = router;