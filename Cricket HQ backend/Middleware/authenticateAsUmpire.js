const jwt = require("jsonwebtoken");
const Match = require("../Models/Match");

// Authentication middleware for umpires
const authenticateAsUmpire = async (req, res, next) => {
    try {
      // Extract the token from the request headers
      const token = req.headers.authorization.split(" ")[1];
  
      // Verify the token with your SECRET_KEY
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  
      // Check if the decoded user ID matches the umpire associated with the match
      const match = await Match.findById(req.params.matchId);
      if (!match || match.umpire.toString() !== decoded.userId) {
        return res.status(403).json({ error: "Access forbidden. You must be the umpire who conducted this match." });
      }
  
      // User is authenticated as the umpire for the match
      next();
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
};

module.exports = authenticateAsUmpire;