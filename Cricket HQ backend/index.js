const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

// Use middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Enable CORS for handling cross-origin requests

// Log URL and HTTP request method
app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.get("/", (req, res,next) => {
    console.log(req.url , req.method)
    next()
});

// Import route files
const authRoute = require("./Routes/auth.js");
const userRoute = require("./Routes/user.js");
const userRoleRoute = require("./Routes/userRole.js");
const teamRoute = require("./Routes/team.js");
const matchRoute = require("./Routes/match.js");

// Connect to the database
const connection = require("./DB.js");
connection();

// Define API routes
app.use("/api/auth", authRoute); // Mount authentication-related routes under /api/auth path
app.use("/api/user", userRoute); // Mount user-related routes under /api/user path
app.use("/api/user-role", userRoleRoute); // Mount user-role-related routes
app.use("/api/team", teamRoute); // Mount team-related routes
app.use("/api/match", matchRoute); // Mount match-related routes

// Set the server to listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});