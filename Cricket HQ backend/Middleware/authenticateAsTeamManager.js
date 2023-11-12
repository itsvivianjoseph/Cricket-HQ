const jwt = require("jsonwebtoken");

const authenticateAsTeamManager = (req, res, next) => {

    // Check if the user has included a token in the Authorization header
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    // Split the Authorization header to get the token part
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Check if the user has the "team manager" role (adjust as per your data structure)
        if (decoded.userRole === "TeamManager") {
            req.user = decoded; // Attach the decoded token data to the request
            next(); // User is authenticated as a team manager
        } else {
            res.status(403).json({ error: "Access forbidden. You must be a team manager to perform this action." });
        }
    });
};

module.exports = authenticateAsTeamManager;