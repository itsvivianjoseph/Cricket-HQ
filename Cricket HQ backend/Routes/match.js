const express = require("express");
const router = express.Router();
const Match = require("../Models/Match");
const authenticateAsUmpire = require("../Middleware/authenticateAsUmpire")

// Get all matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: "Error fetching matches" });
  }
});

// Create a new match
router.post("/", async (req, res) => {
  try {
    const {
      teamOne,
      teamTwo,
      date,
      location,
      teamOnePlayers,
      teamTwoPlayers,
      umpireId,
    } = req.body;

    const match = new Match({
      teamOne,
      teamTwo,
      date,
      location,
      teamOnePlayers,
      teamTwoPlayers,
      umpire: umpireId, // Corrected field name
    });

    const savedMatch = await match.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(500).json({ error: "Error creating a new match" });
  }
});

// Get a single match by ID
router.get("/:matchId", async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: "Error fetching the match" });
  }
});

// Update a match by ID (Only accessible by authenticated umpire)
router.put("/:matchId", authenticateAsUmpire, async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.matchId, req.body, {
      new: true,
    });
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: "Error updating the match" });
  }
});


// Update specific fields of a match by ID (Only accessible by authenticated umpire)
router.patch("/:matchId", authenticateAsUmpire, async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Update specific fields based on the request body
    if (req.body.date) {
      match.date = req.body.date;
    }
    if (req.body.location) {
      match.location = req.body.location;
    }
    if (req.body.result) {
      match.result = req.body.result;
    }

    const updatedMatch = await match.save();
    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(500).json({ error: "Error updating the match" });
  }
});

// Delete a match by ID (Only accessible by authenticated umpire)
router.delete("/:matchId", authenticateAsUmpire, async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.matchId);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the match" });
  }
});

module.exports = router;