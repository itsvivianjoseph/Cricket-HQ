const express = require("express");
const router = express.Router();
const Team = require("../Models/Team");
const Player = require("../Models/Player");
const authenticateAsTeamManager = require("../middleware/authenticateAsTeamManager");

// Create a new team (only accessible to team managers)
router.post("/", authenticateAsTeamManager, async (req, res) => {
    try {
        const { name, description, startedYear } = req.body;
        const manager = req.user.userId; // Team manager's user ID from the token

        // Create a new team with the provided data
        const team = new Team({ name, description, manager, startedYear });

        // Save the team to the database
        await team.save();

        res.status(201).json({ message: "Team created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Team creation failed" });
    }
});

// Update team information (only accessible to team managers)
router.put("/:teamId", authenticateAsTeamManager, async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const manager = req.user.userId; // Team manager's user ID from the token

        // Find the team by ID and manager
        const team = await Team.findOne({ _id: teamId, manager });

        if (!team) {
            return res.status(404).json({ error: "Team not found or you are not the team manager" });
        }

        // Update team information
        const { name, description, startedYear } = req.body;
        team.name = name || team.name;
        team.description = description || team.description;
        team.startedYear = startedYear || team.startedYear;

        await team.save();

        res.status(200).json({ message: "Team information updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Team information update failed" });
    }
});

// Add a player to the team (only accessible to team managers)
router.post("/:teamId/addPlayer", authenticateAsTeamManager, async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const manager = req.user.userId; // Team manager's user ID from the token

        // Find the team by ID and manager
        const team = await Team.findOne({ _id: teamId, manager });

        if (!team) {
            return res.status(404).json({ error: "Team not found or you are not the team manager" });
        }

        // Create a new player and associate them with the team
        const { userId, dateOfBirth, playerRole, playerStats } = req.body;
        const player = new Player({ userId, teamId, dateOfBirth, playerRole, playerStats });

        await player.save();

        res.status(201).json({ message: "Player added to the team successfully" });
    } catch (error) {
        res.status(500).json({ error: "Adding player to the team failed" });
    }
});

module.exports = router;